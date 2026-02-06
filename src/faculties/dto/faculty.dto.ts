import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFacultyDto {
  @ApiProperty()
  name!: string;
}

export class UpdateFacultyDto {
  @ApiPropertyOptional()
  name?: string;
}
