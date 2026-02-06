import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCareerDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  facultyId!: string;
}

export class UpdateCareerDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  facultyId?: string;
}
