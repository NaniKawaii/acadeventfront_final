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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCode = void 0;
const typeorm_1 = require("typeorm");
const registration_entity_1 = require("../registrations/registration.entity");
let QrCode = class QrCode {
};
exports.QrCode = QrCode;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], QrCode.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => registration_entity_1.Registration, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'registration_id' }),
    __metadata("design:type", registration_entity_1.Registration)
], QrCode.prototype, "registration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_id', type: 'bigint' }),
    __metadata("design:type", String)
], QrCode.prototype, "registrationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_token', unique: true }),
    __metadata("design:type", String)
], QrCode.prototype, "qrToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], QrCode.prototype, "createdAt", void 0);
exports.QrCode = QrCode = __decorate([
    (0, typeorm_1.Entity)('qr_codes')
], QrCode);
//# sourceMappingURL=qr-code.entity.js.map