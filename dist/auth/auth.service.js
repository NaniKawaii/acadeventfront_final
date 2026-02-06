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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(dto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new common_1.BadRequestException('El correo ya está registrado');
        }
        const passwordHash = this.hashPassword(dto.password);
        const user = await this.usersService.create({
            fullName: dto.fullName,
            email: dto.email,
            passwordHash,
            roles: dto.roles,
            facultyId: dto.facultyId ?? null,
            careerId: dto.careerId ?? null
        });
        return { user: this.toSafeUser(user) };
    }
    async login(dto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isValid = this.verifyPassword(dto.password, user.passwordHash);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return { user: this.toSafeUser(user) };
    }
    hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const hash = (0, crypto_1.scryptSync)(password, salt, 64).toString('hex');
        return `${salt}:${hash}`;
    }
    verifyPassword(password, stored) {
        const [salt, hash] = stored.split(':');
        if (!salt || !hash) {
            return false;
        }
        const hashBuffer = Buffer.from(hash, 'hex');
        const computed = (0, crypto_1.scryptSync)(password, salt, 64);
        return (0, crypto_1.timingSafeEqual)(hashBuffer, computed);
    }
    toSafeUser(user) {
        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            roles: user.roles,
            facultyId: user.facultyId,
            careerId: user.careerId
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map