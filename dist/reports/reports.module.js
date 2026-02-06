"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reports_service_1 = require("./reports.service");
const reports_controller_1 = require("./reports.controller");
const event_entity_1 = require("../events/event.entity");
const registration_entity_1 = require("../registrations/registration.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const certificate_entity_1 = require("../certificates/certificate.entity");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([event_entity_1.Event, registration_entity_1.Registration, attendance_entity_1.Attendance, certificate_entity_1.Certificate])],
        providers: [reports_service_1.ReportsService],
        controllers: [reports_controller_1.ReportsController]
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map