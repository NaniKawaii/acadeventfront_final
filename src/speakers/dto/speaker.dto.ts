import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSpeakerDto {
  @ApiProperty()
  fullName!: string;

  @ApiPropertyOptional({ nullable: true })
  bio?: string | null;

  @ApiPropertyOptional({ nullable: true })
  photoUrl?: string | null;
}

export class UpdateSpeakerDto {
  @ApiPropertyOptional()
  fullName?: string;

  @ApiPropertyOptional({ nullable: true })
  bio?: string | null;

  @ApiPropertyOptional({ nullable: true })
  photoUrl?: string | null;
}
