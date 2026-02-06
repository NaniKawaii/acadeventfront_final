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
exports.QrCodesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const qr_codes_service_1 = require("./qr-codes.service");
let QrCodesController = class QrCodesController {
    constructor(qrCodesService) {
        this.qrCodesService = qrCodesService;
    }
    generate(registrationId) {
        return this.qrCodesService.generateForRegistration(registrationId);
    }
    getByRegistration(registrationId) {
        return this.qrCodesService.findByRegistration(registrationId);
    }
    verify(token) {
        return this.qrCodesService.findByToken(token);
    }
};
exports.QrCodesController = QrCodesController;
__decorate([
    (0, swagger_1.ApiParam)({ name: 'registrationId' }),
    (0, common_1.Post)('registrations/:registrationId'),
    __param(0, (0, common_1.Param)('registrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QrCodesController.prototype, "generate", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'registrationId' }),
    (0, common_1.Get)('registrations/:registrationId'),
    __param(0, (0, common_1.Param)('registrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QrCodesController.prototype, "getByRegistration", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'token' }),
    (0, common_1.Get)('verify/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QrCodesController.prototype, "verify", null);
exports.QrCodesController = QrCodesController = __decorate([
    (0, swagger_1.ApiTags)('QR Codes'),
    (0, common_1.Controller)('qr-codes'),
    __metadata("design:paramtypes", [qr_codes_service_1.QrCodesService])
], QrCodesController);
//# sourceMappingURL=qr-codes.controller.js.map