import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('El correo ya está registrado');
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

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const isValid = this.verifyPassword(dto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return { user: this.toSafeUser(user) };
  }

  private hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, stored: string) {
    const [salt, hash] = stored.split(':');
    if (!salt || !hash) {
      return false;
    }
    const hashBuffer = Buffer.from(hash, 'hex');
    const computed = scryptSync(password, salt, 64);
    return timingSafeEqual(hashBuffer, computed);
  }

  private toSafeUser(user: {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
    facultyId: string | null;
    careerId: string | null;
  }) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      roles: user.roles,
      facultyId: user.facultyId,
      careerId: user.careerId
    };
  }
}
