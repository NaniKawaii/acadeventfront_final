import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventModality } from '../event.entity';

export class CreateEventDto {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

  @ApiPropertyOptional({ nullable: true })
  bannerUrl?: string | null;

  @ApiProperty()
  location!: string;

  @ApiProperty({ enum: EventModality })
  modality!: EventModality;

  @ApiProperty()
  capacity!: number;

  @ApiPropertyOptional({ nullable: true })
  requirements?: string | null;

  @ApiProperty({ format: 'date-time' })
  startAt!: string;

  @ApiProperty({ format: 'date-time' })
  endAt!: string;

  @ApiProperty()
  organizerId!: string;

  @ApiPropertyOptional({ nullable: true })
  facultyId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  careerId?: string | null;

  @ApiPropertyOptional({ type: [String] })
  speakerIds?: string[];
}

export class UpdateEventDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({ nullable: true })
  bannerUrl?: string | null;

  @ApiPropertyOptional()
  location?: string;

  @ApiPropertyOptional({ enum: EventModality })
  modality?: EventModality;

  @ApiPropertyOptional()
  capacity?: number;

  @ApiPropertyOptional({ nullable: true })
  requirements?: string | null;

  @ApiPropertyOptional({ format: 'date-time' })
  startAt?: string;

  @ApiPropertyOptional({ format: 'date-time' })
  endAt?: string;

  @ApiPropertyOptional()
  organizerId?: string;

  @ApiPropertyOptional({ nullable: true })
  facultyId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  careerId?: string | null;

  @ApiPropertyOptional({ type: [String] })
  speakerIds?: string[];
}
