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
exports.Attendance = exports.AttendanceMethod = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../events/event.entity");
const user_entity_1 = require("../users/user.entity");
var AttendanceMethod;
(function (AttendanceMethod) {
    AttendanceMethod["MANUAL"] = "MANUAL";
    AttendanceMethod["QR"] = "QR";
})(AttendanceMethod || (exports.AttendanceMethod = AttendanceMethod = {}));
let Attendance = class Attendance {
};
exports.Attendance = Attendance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], Attendance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.attendances, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], Attendance.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id', type: 'bigint' }),
    __metadata("design:type", String)
], Attendance.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.attendances, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Attendance.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", String)
], Attendance.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_in_time', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "checkInTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Attendance.prototype, "present", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "method", void 0);
exports.Attendance = Attendance = __decorate([
    (0, typeorm_1.Entity)('attendances'),
    (0, typeorm_1.Index)(['eventId', 'userId'], { unique: true })
], Attendance);
//# sourceMappingURL=attendance.entity.js.map