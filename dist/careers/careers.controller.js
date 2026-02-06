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
exports.CareersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const careers_service_1 = require("./careers.service");
const career_dto_1 = require("./dto/career.dto");
let CareersController = class CareersController {
    constructor(careersService) {
        this.careersService = careersService;
    }
    findAll(facultyId) {
        return this.careersService.findAll(facultyId);
    }
    findOne(id) {
        return this.careersService.findOne(id);
    }
    create(dto) {
        return this.careersService.create(dto);
    }
    update(id, dto) {
        return this.careersService.update(id, dto);
    }
    remove(id) {
        return this.careersService.remove(id);
    }
};
exports.CareersController = CareersController;
__decorate([
    (0, swagger_1.ApiQuery)({ name: 'facultyId', required: false }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('facultyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [career_dto_1.CreateCareerDto]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, career_dto_1.UpdateCareerDto]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "remove", null);
exports.CareersController = CareersController = __decorate([
    (0, swagger_1.ApiTags)('Careers'),
    (0, common_1.Controller)('careers'),
    __metadata("design:paramtypes", [careers_service_1.CareersService])
], CareersController);
//# sourceMappingURL=careers.controller.js.map