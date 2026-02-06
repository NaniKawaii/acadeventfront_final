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
exports.RegistrationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const registrations_service_1 = require("./registrations.service");
const registration_dto_1 = require("./dto/registration.dto");
let RegistrationsController = class RegistrationsController {
    constructor(registrationsService) {
        this.registrationsService = registrationsService;
    }
    listByEvent(eventId) {
        return this.registrationsService.listByEvent(eventId);
    }
    listByUser(userId) {
        return this.registrationsService.listByUser(userId);
    }
    register(eventId, dto) {
        return this.registrationsService.register(eventId, dto.userId);
    }
    cancel(eventId, userId) {
        return this.registrationsService.cancel(eventId, userId);
    }
};
exports.RegistrationsController = RegistrationsController;
__decorate([
    (0, swagger_1.ApiParam)({ name: 'eventId' }),
    (0, common_1.Get)('events/:eventId/registrations'),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "listByEvent", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'userId' }),
    (0, common_1.Get)('users/:userId/registrations'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "listByUser", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'eventId' }),
    (0, common_1.Post)('events/:eventId/registrations'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, registration_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'eventId' }),
    (0, swagger_1.ApiParam)({ name: 'userId' }),
    (0, common_1.Delete)('events/:eventId/registrations/:userId'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "cancel", null);
exports.RegistrationsController = RegistrationsController = __decorate([
    (0, swagger_1.ApiTags)('Registrations'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [registrations_service_1.RegistrationsService])
], RegistrationsController);
//# sourceMappingURL=registrations.controller.js.map