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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./attendance.entity");
const registration_entity_1 = require("../registrations/registration.entity");
const qr_code_entity_1 = require("../qr-codes/qr-code.entity");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository, registrationsRepository, qrCodesRepository) {
        this.attendanceRepository = attendanceRepository;
        this.registrationsRepository = registrationsRepository;
        this.qrCodesRepository = qrCodesRepository;
    }
    listByEvent(eventId) {
        return this.attendanceRepository.find({ where: { eventId } });
    }
    async markManual(eventId, dto) {
        const registration = await this.registrationsRepository.findOne({
            where: { eventId, userId: dto.userId }
        });
        if (!registration) {
            throw new common_1.NotFoundException('Inscripción no encontrada');
        }
        return this.upsertAttendance(eventId, dto.userId, dto.present, attendance_entity_1.AttendanceMethod.MANUAL);
    }
    async markByQr(eventId, dto) {
        const qrCode = await this.qrCodesRepository.findOne({
            where: { qrToken: dto.qrToken }
        });
        if (!qrCode) {
            throw new common_1.NotFoundException('QR inválido');
        }
        const registration = await this.registrationsRepository.findOne({
            where: { id: qrCode.registrationId }
        });
        if (!registration) {
            throw new common_1.NotFoundException('Inscripción no encontrada');
        }
        if (registration.eventId !== eventId) {
            throw new common_1.BadRequestException('QR no corresponde al evento');
        }
        const alreadyUsed = await this.attendanceRepository.findOne({
            where: { eventId, userId: registration.userId, present: true }
        });
        if (alreadyUsed) {
            throw new common_1.BadRequestException('QR ya utilizado');
        }
        return this.upsertAttendance(eventId, registration.userId, true, attendance_entity_1.AttendanceMethod.QR);
    }
    async upsertAttendance(eventId, userId, present, method) {
        const existing = await this.attendanceRepository.findOne({
            where: { eventId, userId }
        });
        if (existing) {
            existing.present = present;
            existing.checkInTime = present ? new Date() : existing.checkInTime;
            existing.method = method;
            return this.attendanceRepository.save(existing);
        }
        const attendance = this.attendanceRepository.create({
            eventId,
            userId,
            present,
            method,
            checkInTime: present ? new Date() : null
        });
        return this.attendanceRepository.save(attendance);
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(1, (0, typeorm_1.InjectRepository)(registration_entity_1.Registration)),
    __param(2, (0, typeorm_1.InjectRepository)(qr_code_entity_1.QrCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map