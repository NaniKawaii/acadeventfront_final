import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty()
  fullName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  passwordHash!: string;

  @ApiProperty({ enum: UserRole, isArray: true })
  roles!: UserRole[];

  @ApiPropertyOptional({ nullable: true })
  facultyId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  careerId?: string | null;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  fullName?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  passwordHash?: string;

  @ApiPropertyOptional({ enum: UserRole, isArray: true })
  roles?: UserRole[];

  @ApiPropertyOptional({ nullable: true })
  facultyId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  careerId?: string | null;
}
