import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../users/user.entity';

export class RegisterDto {
  @ApiProperty()
  fullName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty({ enum: UserRole, isArray: true })
  roles!: UserRole[];

  @ApiPropertyOptional({ nullable: true })
  facultyId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  careerId?: string | null;
}

export class LoginDto {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}
