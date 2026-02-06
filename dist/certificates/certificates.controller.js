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
exports.CertificatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const certificates_service_1 = require("./certificates.service");
const certificate_dto_1 = require("./dto/certificate.dto");
let CertificatesController = class CertificatesController {
    constructor(certificatesService) {
        this.certificatesService = certificatesService;
    }
    listByUser(userId) {
        return this.certificatesService.listByUser(userId);
    }
    generate(eventId, userId, dto) {
        return this.certificatesService.generate(eventId, userId, dto);
    }
    verify(code) {
        return this.certificatesService.verify(code);
    }
};
exports.CertificatesController = CertificatesController;
__decorate([
    (0, swagger_1.ApiParam)({ name: 'userId' }),
    (0, common_1.Get)('users/:userId/certificates'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "listByUser", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'eventId' }),
    (0, swagger_1.ApiParam)({ name: 'userId' }),
    (0, common_1.Post)('events/:eventId/certificates/:userId'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, certificate_dto_1.GenerateCertificateDto]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "generate", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'code' }),
    (0, common_1.Get)('certificates/verify/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "verify", null);
exports.CertificatesController = CertificatesController = __decorate([
    (0, swagger_1.ApiTags)('Certificates'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [certificates_service_1.CertificatesService])
], CertificatesController);
//# sourceMappingURL=certificates.controller.js.map