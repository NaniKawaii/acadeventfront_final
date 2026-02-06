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
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../user.entity");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_entity_1.UserRole, isArray: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "facultyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "careerId", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.UserRole, isArray: true }),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "facultyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "careerId", void 0);
//# sourceMappingURL=user.dto.js.map