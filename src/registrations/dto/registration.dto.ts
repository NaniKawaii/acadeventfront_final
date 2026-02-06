import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  userId!: string;
}
