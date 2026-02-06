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
exports.FacultiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const faculty_entity_1 = require("./faculty.entity");
let FacultiesService = class FacultiesService {
    constructor(facultiesRepository) {
        this.facultiesRepository = facultiesRepository;
    }
    findAll() {
        return this.facultiesRepository.find();
    }
    async findOne(id) {
        const faculty = await this.facultiesRepository.findOne({ where: { id } });
        if (!faculty) {
            throw new common_1.NotFoundException('Facultad no encontrada');
        }
        return faculty;
    }
    create(dto) {
        const faculty = this.facultiesRepository.create(dto);
        return this.facultiesRepository.save(faculty);
    }
    async update(id, dto) {
        const faculty = await this.findOne(id);
        Object.assign(faculty, dto);
        return this.facultiesRepository.save(faculty);
    }
    async remove(id) {
        const faculty = await this.findOne(id);
        await this.facultiesRepository.remove(faculty);
        return { deleted: true };
    }
};
exports.FacultiesService = FacultiesService;
exports.FacultiesService = FacultiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faculty_entity_1.Faculty)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FacultiesService);
//# sourceMappingURL=faculties.service.js.map