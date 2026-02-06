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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const attendance_dto_1 = require("./dto/attendance.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    list(eventId) {
        return this.attendanceService.listByEvent(eventId);
    }
    markManual(eventId, dto) {
        return this.attendanceService.markManual(eventId, dto);
    }
    markQr(eventId, dto) {
        return this.attendanceService.markByQr(eventId, dto);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, swagger_1.ApiParam)({ name: 'eventId' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'eventId' }),
    (0, common_1.Post)('manual'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attendance_dto_1.ManualAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "markManual", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'eventId' }),
    (0, common_1.Post)('qr'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attendance_dto_1.QrAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "markQr", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, common_1.Controller)('events/:eventId/attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map