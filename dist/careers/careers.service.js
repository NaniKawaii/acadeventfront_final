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
exports.CareersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const career_entity_1 = require("./career.entity");
let CareersService = class CareersService {
    constructor(careersRepository) {
        this.careersRepository = careersRepository;
    }
    findAll(facultyId) {
        if (facultyId) {
            return this.careersRepository.find({ where: { facultyId } });
        }
        return this.careersRepository.find();
    }
    async findOne(id) {
        const career = await this.careersRepository.findOne({ where: { id } });
        if (!career) {
            throw new common_1.NotFoundException('Carrera no encontrada');
        }
        return career;
    }
    create(dto) {
        const career = this.careersRepository.create(dto);
        return this.careersRepository.save(career);
    }
    async update(id, dto) {
        const career = await this.findOne(id);
        Object.assign(career, dto);
        return this.careersRepository.save(career);
    }
    async remove(id) {
        const career = await this.findOne(id);
        await this.careersRepository.remove(career);
        return { deleted: true };
    }
};
exports.CareersService = CareersService;
exports.CareersService = CareersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(career_entity_1.Career)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CareersService);
//# sourceMappingURL=careers.service.js.map