"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const certificate_entity_1 = require("./certificate.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const event_entity_1 = require("../events/event.entity");
const user_entity_1 = require("../users/user.entity");
const crypto_1 = require("crypto");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const os = require("os");
let CertificatesService = class CertificatesService {
    constructor(certificatesRepository, attendanceRepository, eventsRepository, usersRepository) {
        this.certificatesRepository = certificatesRepository;
        this.attendanceRepository = attendanceRepository;
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
    }
    async listByUser(userId) {
        return this.certificatesRepository.find({
            where: { userId },
            relations: ['event']
        });
    }
    async generate(eventId, userId, dto) {
        const event = await this.eventsRepository.findOne({ where: { id: eventId } });
        if (!event) {
            throw new common_1.NotFoundException('Evento no encontrado');
        }
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const existing = await this.certificatesRepository.findOne({
            where: { eventId, userId }
        });
        if (existing) {
            return existing;
        }
        const presentCount = await this.attendanceRepository.count({
            where: { eventId, userId, present: true }
        });
        if (presentCount === 0) {
            throw new common_1.BadRequestException('No cumple asistencia para certificado');
        }
        const verificationCode = (0, crypto_1.randomUUID)();
        const certificate = this.certificatesRepository.create({
            eventId,
            userId,
            verificationCode,
            pdfUrl: null
        });
        const saved = await this.certificatesRepository.save(certificate);
        saved.pdfUrl = `/certificates/${saved.id}/download`;
        return this.certificatesRepository.save(saved);
    }
    async verify(code) {
        const certificate = await this.certificatesRepository.findOne({
            where: { verificationCode: code },
            relations: ['event', 'user']
        });
        if (!certificate) {
            throw new common_1.NotFoundException('Certificado no encontrado');
        }
        return certificate;
    }
    async getPdfPath(id) {
        const certificate = await this.certificatesRepository.findOne({
            where: { id },
            relations: ['event', 'user']
        });
        if (!certificate) {
            throw new common_1.NotFoundException('Certificado no encontrado');
        }
        const filePath = await this.generatePdfFile(certificate.event, certificate.user, certificate.verificationCode);
        if (!certificate.pdfUrl) {
            certificate.pdfUrl = `/certificates/${certificate.id}/download`;
            await this.certificatesRepository.save(certificate);
        }
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('PDF no disponible');
        }
        return filePath;
    }
    async generatePdfFile(event, user, verificationCode) {
        const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 48 });
        const fileName = `certificate-${verificationCode}.pdf`;
        const filePath = path.join(os.tmpdir(), 'acadevent', 'certificates', fileName);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);
        const { width, height } = doc.page;
        const ribbonWidth = 190;
        const contentWidth = width - ribbonWidth;
        const contentLeft = 60;
        const contentRight = contentWidth - 60;
        const headerY = 90;
        const mainCenter = contentWidth / 2;
        const dateText = event.startAt.toLocaleDateString('es-ES');
        const timeText = `${event.startAt.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        })} - ${event.endAt.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        })}`;
        doc.rect(0, 0, width, height).fill('#fbfaf7');
        doc.rect(width - ribbonWidth, 0, ribbonWidth, height).fill('#edeaf6');
        doc.rect(22, 22, width - 44, height - 44).lineWidth(2).stroke('#6f63ff');
        doc.rect(32, 32, width - 64, height - 64).lineWidth(1).stroke('#d4cff7');
        doc.save();
        doc.opacity(0.08);
        doc.strokeColor('#b3a9ea').lineWidth(1.2);
        doc.circle(170, 270, 140).stroke();
        doc.circle(300, 420, 120).stroke();
        doc.circle(120, 470, 90).stroke();
        doc.restore();
        doc.fillColor('#2d2a8c');
        doc.fontSize(42).text('AcadEvent', contentLeft, headerY, {
            width: contentRight - contentLeft,
            align: 'left'
        });
        doc.fillColor('#3a3a5c');
        doc.fontSize(16).text('Certificado de asistencia', contentLeft, headerY + 48, {
            width: contentRight - contentLeft,
            align: 'left'
        });
        doc.fillColor('#1f1f2e');
        doc.fontSize(16).text('Se certifica que', 0, 210, { align: 'center', width: contentWidth });
        doc.fontSize(28).fillColor('#2d2a8c').text(user.fullName, 0, 238, {
            align: 'center',
            width: contentWidth
        });
        doc.fillColor('#1f1f2e');
        doc.fontSize(15).text('ha asistido al evento', 0, 285, {
            align: 'center',
            width: contentWidth
        });
        doc.fontSize(20).fillColor('#1f1f2e').text(`"${event.title}"`, 90, 312, {
            align: 'center',
            width: contentWidth - 180
        });
        doc.fontSize(13).fillColor('#3a3a5c').text(`Realizado el ${dateText} · ${timeText}`, 0, 350, { align: 'center', width: contentWidth });
        doc.fillColor('#1f1f2e');
        doc.lineWidth(1).moveTo(contentLeft, height - 170).lineTo(contentLeft + 240, height - 170).stroke('#5b4fe9');
        doc.fontSize(12).fillColor('#3a3a5c').text('Autoridad académica', contentLeft, height - 155);
        doc.fillColor('#3a3a5c');
        doc.fontSize(11).text(`Código de verificación: ${verificationCode}`, 0, height - 140, {
            align: 'center',
            width: contentWidth
        });
        doc.fontSize(11).text(`Fecha de emisión: ${new Date().toLocaleDateString('es-ES')}`, 0, height - 120, {
            align: 'center',
            width: contentWidth
        });
        const ribbonX = width - ribbonWidth;
        const ribbonCenter = ribbonX + ribbonWidth / 2;
        doc.fillColor('#4b4b5e');
        doc.fontSize(11).text('CERTIFICADO', ribbonX, 90, {
            width: ribbonWidth,
            align: 'center'
        });
        doc.fontSize(11).text('DE ASISTENCIA', ribbonX, 106, {
            width: ribbonWidth,
            align: 'center'
        });
        doc.lineWidth(1).strokeColor('#b3aecf');
        doc.moveTo(ribbonX + 26, 130).lineTo(ribbonX + ribbonWidth - 26, 130).stroke();
        doc.lineWidth(2).strokeColor('#6b6b80');
        doc.circle(ribbonCenter, height / 2, 58).stroke();
        doc.circle(ribbonCenter, height / 2, 48).stroke();
        doc.fillColor('#6b6b80');
        doc.fontSize(10).text('ACAD', ribbonX, height / 2 - 14, {
            width: ribbonWidth,
            align: 'center'
        });
        doc.fontSize(10).text('EVENT', ribbonX, height / 2 + 2, {
            width: ribbonWidth,
            align: 'center'
        });
        doc.fillColor('#4b4b5e');
        doc.fontSize(10).text('Verifica en', ribbonX, height - 140, {
            width: ribbonWidth,
            align: 'center'
        });
        doc.fontSize(9).text('/verify?code=' + verificationCode, ribbonX, height - 124, {
            width: ribbonWidth,
            align: 'center'
        });
        doc.end();
        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(filePath));
            stream.on('error', reject);
        });
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __param(1, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(2, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map