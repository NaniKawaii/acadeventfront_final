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
exports.Career = void 0;
const typeorm_1 = require("typeorm");
const faculty_entity_1 = require("../faculties/faculty.entity");
const event_entity_1 = require("../events/event.entity");
let Career = class Career {
};
exports.Career = Career;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], Career.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Career.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => faculty_entity_1.Faculty, (faculty) => faculty.careers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'faculty_id' }),
    __metadata("design:type", faculty_entity_1.Faculty)
], Career.prototype, "faculty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'faculty_id', type: 'bigint' }),
    __metadata("design:type", String)
], Career.prototype, "facultyId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, (event) => event.career),
    __metadata("design:type", Array)
], Career.prototype, "events", void 0);
exports.Career = Career = __decorate([
    (0, typeorm_1.Entity)('careers')
], Career);
//# sourceMappingURL=career.entity.js.map