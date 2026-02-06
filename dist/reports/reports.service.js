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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("../events/event.entity");
const registration_entity_1 = require("../registrations/registration.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const certificate_entity_1 = require("../certificates/certificate.entity");
let ReportsService = class ReportsService {
    constructor(eventsRepository, registrationsRepository, attendanceRepository, certificatesRepository) {
        this.eventsRepository = eventsRepository;
        this.registrationsRepository = registrationsRepository;
        this.attendanceRepository = attendanceRepository;
        this.certificatesRepository = certificatesRepository;
    }
    async eventReport(eventId) {
        const event = await this.eventsRepository.findOne({ where: { id: eventId } });
        if (!event) {
            throw new common_1.NotFoundException('Evento no encontrado');
        }
        const registered = await this.registrationsRepository.count({
            where: { eventId, status: registration_entity_1.RegistrationStatus.INSCRITO }
        });
        const waiting = await this.registrationsRepository.count({
            where: { eventId, status: registration_entity_1.RegistrationStatus.LISTA_ESPERA }
        });
        const cancelled = await this.registrationsRepository.count({
            where: { eventId, status: registration_entity_1.RegistrationStatus.CANCELADO }
        });
        const present = await this.attendanceRepository.count({
            where: { eventId, present: true }
        });
        const absent = await this.attendanceRepository.count({
            where: { eventId, present: false }
        });
        return {
            eventId,
            capacity: event.capacity,
            registered,
            waiting,
            cancelled,
            present,
            absent,
            attendanceRate: registered > 0 ? Math.round((present / registered) * 100) : 0
        };
    }
    async summary(filters) {
        const eventsQb = this.eventsRepository.createQueryBuilder('event');
        if (filters.facultyId) {
            eventsQb.andWhere('event.facultyId = :facultyId', { facultyId: filters.facultyId });
        }
        if (filters.start) {
            eventsQb.andWhere('event.startAt >= :start', { start: new Date(filters.start) });
        }
        if (filters.end) {
            eventsQb.andWhere('event.startAt <= :end', { end: new Date(filters.end) });
        }
        const events = await eventsQb.getMany();
        const eventIds = events.map((e) => e.id);
        if (eventIds.length === 0) {
            return {
                totalEvents: 0,
                totalRegistrations: 0,
                totalAttendance: 0,
                totalCertified: 0
            };
        }
        const totalRegistrations = await this.registrationsRepository.count({
            where: { eventId: (0, typeorm_2.In)(eventIds) }
        });
        const totalAttendance = await this.attendanceRepository.count({
            where: { eventId: (0, typeorm_2.In)(eventIds), present: true }
        });
        const certificates = await this.certificatesRepository.find({
            where: { eventId: (0, typeorm_2.In)(eventIds) }
        });
        return {
            totalEvents: eventIds.length,
            totalRegistrations,
            totalAttendance,
            totalCertified: certificates.length
        };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(registration_entity_1.Registration)),
    __param(2, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(3, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map