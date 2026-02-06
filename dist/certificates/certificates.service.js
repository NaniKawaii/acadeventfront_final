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
let CertificatesService = class CertificatesService {
    constructor(certificatesRepository, attendanceRepository, eventsRepository, usersRepository) {
        this.certificatesRepository = certificatesRepository;
        this.attendanceRepository = attendanceRepository;
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
    }
    async listByUser(userId) {
        return this.certificatesRepository.find({ where: { userId } });
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
        const pdfUrl = await this.generatePdf(event, user, verificationCode);
        const certificate = this.certificatesRepository.create({
            eventId,
            userId,
            verificationCode,
            pdfUrl
        });
        return this.certificatesRepository.save(certificate);
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
    async generatePdf(event, user, verificationCode) {
        const doc = new PDFDocument();
        const fileName = `certificate-${verificationCode}.pdf`;
        const filePath = path.join(__dirname, '../../uploads/certificates', fileName);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);
        doc.fontSize(24).text('CERTIFICADO DE ASISTENCIA', { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text('Acadevent - Universidad', { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(14).text(`Se certifica que ${user.fullName}`, { align: 'center' });
        doc.moveDown();
        doc.text(`ha asistido al evento "${event.title}"`, { align: 'center' });
        doc.moveDown();
        doc.text(`realizado el ${event.startAt.toLocaleDateString('es-ES')}`, { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(12).text(`Código de verificación: ${verificationCode}`, { align: 'center' });
        doc.moveDown();
        doc.text(`Fecha de emisión: ${new Date().toLocaleDateString('es-ES')}`, { align: 'center' });
        doc.end();
        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(`/certificates/${fileName}`));
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