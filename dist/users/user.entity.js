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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../events/event.entity");
const registration_entity_1 = require("../registrations/registration.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const certificate_entity_1 = require("../certificates/certificate.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["ORGANIZADOR"] = "ORGANIZADOR";
    UserRole["ASISTENTE"] = "ASISTENTE";
    UserRole["SCANNER"] = "SCANNER";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'faculty_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "facultyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'career_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "careerId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, (event) => event.organizer),
    __metadata("design:type", Array)
], User.prototype, "organizedEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registration_entity_1.Registration, (registration) => registration.user),
    __metadata("design:type", Array)
], User.prototype, "registrations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, (attendance) => attendance.user),
    __metadata("design:type", Array)
], User.prototype, "attendances", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_entity_1.Certificate, (certificate) => certificate.user),
    __metadata("design:type", Array)
], User.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map