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
exports.QrCodesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const qr_code_entity_1 = require("./qr-code.entity");
const registrations_service_1 = require("../registrations/registrations.service");
const crypto_1 = require("crypto");
let QrCodesService = class QrCodesService {
    constructor(qrCodeRepository, registrationsService) {
        this.qrCodeRepository = qrCodeRepository;
        this.registrationsService = registrationsService;
    }
    async generateForRegistration(registrationId) {
        const registration = await this.registrationsService.findOne(registrationId);
        if (!registration) {
            throw new common_1.NotFoundException('Registration not found');
        }
        const existing = await this.qrCodeRepository.findOne({
            where: { registrationId },
        });
        if (existing) {
            return existing;
        }
        const qrToken = (0, crypto_1.randomBytes)(16).toString('hex');
        const qrCode = this.qrCodeRepository.create({
            registrationId,
            qrToken,
        });
        return this.qrCodeRepository.save(qrCode);
    }
    async findByToken(qrToken) {
        return this.qrCodeRepository.findOne({
            where: { qrToken },
            relations: ['registration', 'registration.event', 'registration.user'],
        });
    }
    async findByRegistration(registrationId) {
        return this.qrCodeRepository.findOne({
            where: { registrationId },
        });
    }
};
exports.QrCodesService = QrCodesService;
exports.QrCodesService = QrCodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(qr_code_entity_1.QrCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        registrations_service_1.RegistrationsService])
], QrCodesService);
//# sourceMappingURL=qr-codes.service.js.map