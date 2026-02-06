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
exports.Event = exports.EventModality = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const faculty_entity_1 = require("../faculties/faculty.entity");
const career_entity_1 = require("../careers/career.entity");
const registration_entity_1 = require("../registrations/registration.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const certificate_entity_1 = require("../certificates/certificate.entity");
const speaker_entity_1 = require("../speakers/speaker.entity");
var EventModality;
(function (EventModality) {
    EventModality["PRESENCIAL"] = "PRESENCIAL";
    EventModality["VIRTUAL"] = "VIRTUAL";
    EventModality["HIBRIDO"] = "HIBRIDO";
})(EventModality || (exports.EventModality = EventModality = {}));
let Event = class Event {
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'banner_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "bannerUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Event.prototype, "modality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_datetime', type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_datetime', type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.organizedEvents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'organizer_id' }),
    __metadata("design:type", user_entity_1.User)
], Event.prototype, "organizer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organizer_id', type: 'bigint' }),
    __metadata("design:type", String)
], Event.prototype, "organizerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => faculty_entity_1.Faculty, (faculty) => faculty.events, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'faculty_id' }),
    __metadata("design:type", faculty_entity_1.Faculty)
], Event.prototype, "faculty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'faculty_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "facultyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => career_entity_1.Career, (career) => career.events, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'career_id' }),
    __metadata("design:type", career_entity_1.Career)
], Event.prototype, "career", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'career_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "careerId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => speaker_entity_1.Speaker, (speaker) => speaker.events, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'event_speakers',
        joinColumn: { name: 'event_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'speaker_id', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], Event.prototype, "speakers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registration_entity_1.Registration, (registration) => registration.event),
    __metadata("design:type", Array)
], Event.prototype, "registrations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, (attendance) => attendance.event),
    __metadata("design:type", Array)
], Event.prototype, "attendances", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_entity_1.Certificate, (certificate) => certificate.event),
    __metadata("design:type", Array)
], Event.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)('events')
], Event);
//# sourceMappingURL=event.entity.js.map