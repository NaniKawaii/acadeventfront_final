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
exports.FacultiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const faculties_service_1 = require("./faculties.service");
const faculty_dto_1 = require("./dto/faculty.dto");
let FacultiesController = class FacultiesController {
    constructor(facultiesService) {
        this.facultiesService = facultiesService;
    }
    findAll() {
        return this.facultiesService.findAll();
    }
    findOne(id) {
        return this.facultiesService.findOne(id);
    }
    create(dto) {
        return this.facultiesService.create(dto);
    }
    update(id, dto) {
        return this.facultiesService.update(id, dto);
    }
    remove(id) {
        return this.facultiesService.remove(id);
    }
};
exports.FacultiesController = FacultiesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FacultiesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacultiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faculty_dto_1.CreateFacultyDto]),
    __metadata("design:returntype", void 0)
], FacultiesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, faculty_dto_1.UpdateFacultyDto]),
    __metadata("design:returntype", void 0)
], FacultiesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacultiesController.prototype, "remove", null);
exports.FacultiesController = FacultiesController = __decorate([
    (0, swagger_1.ApiTags)('Faculties'),
    (0, common_1.Controller)('faculties'),
    __metadata("design:paramtypes", [faculties_service_1.FacultiesService])
], FacultiesController);
//# sourceMappingURL=faculties.controller.js.map