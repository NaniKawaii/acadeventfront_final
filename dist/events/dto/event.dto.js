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
exports.UpdateEventDto = exports.CreateEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const event_entity_1 = require("../event.entity");
class CreateEventDto {
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreateEventDto.prototype, "bannerUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: event_entity_1.EventModality }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreateEventDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "organizerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreateEventDto.prototype, "facultyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreateEventDto.prototype, "careerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "speakerIds", void 0);
class UpdateEventDto {
}
exports.UpdateEventDto = UpdateEventDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], UpdateEventDto.prototype, "bannerUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: event_entity_1.EventModality }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], UpdateEventDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'date-time' }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'date-time' }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "organizerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], UpdateEventDto.prototype, "facultyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], UpdateEventDto.prototype, "careerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    __metadata("design:type", Array)
], UpdateEventDto.prototype, "speakerIds", void 0);
//# sourceMappingURL=event.dto.js.map