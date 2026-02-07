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
exports.RegistrationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const registration_entity_1 = require("./registration.entity");
const event_entity_1 = require("../events/event.entity");
const user_entity_1 = require("../users/user.entity");
const crypto_1 = require("crypto");
const qr_code_entity_1 = require("../qr-codes/qr-code.entity");
let RegistrationsService = class RegistrationsService {
    constructor(registrationsRepository, eventsRepository, usersRepository, qrCodesRepository) {
        this.registrationsRepository = registrationsRepository;
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
        this.qrCodesRepository = qrCodesRepository;
    }
    async listByEvent(eventId) {
        return this.registrationsRepository.find({
            where: { eventId },
            relations: { event: true, user: true }
        });
    }
    async listByUser(userId) {
        return this.registrationsRepository.find({
            where: { userId },
            relations: { event: true }
        });
    }
    async register(eventId, userId) {
        const event = await this.eventsRepository.findOne({ where: { id: eventId } });
        if (!event) {
            throw new common_1.NotFoundException('Evento no encontrado');
        }
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const existing = await this.registrationsRepository.findOne({
            where: { eventId, userId }
        });
        if (existing && existing.status !== registration_entity_1.RegistrationStatus.CANCELADO) {
            throw new common_1.BadRequestException('El usuario ya está inscrito');
        }
        const registeredCount = await this.registrationsRepository.count({
            where: { eventId, status: registration_entity_1.RegistrationStatus.INSCRITO }
        });
        const status = registeredCount >= event.capacity
            ? registration_entity_1.RegistrationStatus.LISTA_ESPERA
            : registration_entity_1.RegistrationStatus.INSCRITO;
        if (existing) {
            existing.status = status;
            return this.registrationsRepository.save(existing);
        }
        const registration = this.registrationsRepository.create({
            eventId,
            userId,
            status
        });
        const saved = await this.registrationsRepository.save(registration);
        const qrCode = this.qrCodesRepository.create({
            registrationId: saved.id,
            qrToken: (0, crypto_1.randomUUID)()
        });
        await this.qrCodesRepository.save(qrCode);
        return saved;
    }
    async cancel(eventId, userId) {
        const registration = await this.registrationsRepository.findOne({
            where: { eventId, userId }
        });
        if (!registration) {
            throw new common_1.NotFoundException('Inscripción no encontrada');
        }
        registration.status = registration_entity_1.RegistrationStatus.CANCELADO;
        return this.registrationsRepository.save(registration);
    }
    async findOne(id) {
        return this.registrationsRepository.findOne({ where: { id } });
    }
};
exports.RegistrationsService = RegistrationsService;
exports.RegistrationsService = RegistrationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(registration_entity_1.Registration)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(qr_code_entity_1.QrCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RegistrationsService);
//# sourceMappingURL=registrations.service.js.map