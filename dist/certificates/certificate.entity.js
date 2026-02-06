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
exports.Certificate = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../events/event.entity");
const user_entity_1 = require("../users/user.entity");
let Certificate = class Certificate {
};
exports.Certificate = Certificate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], Certificate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.certificates, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], Certificate.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id', type: 'bigint' }),
    __metadata("design:type", String)
], Certificate.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.certificates, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Certificate.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", String)
], Certificate.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verification_code', unique: true }),
    __metadata("design:type", String)
], Certificate.prototype, "verificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pdf_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Certificate.prototype, "pdfUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'issued_at' }),
    __metadata("design:type", Date)
], Certificate.prototype, "issuedAt", void 0);
exports.Certificate = Certificate = __decorate([
    (0, typeorm_1.Entity)('certificates')
], Certificate);
//# sourceMappingURL=certificate.entity.js.map