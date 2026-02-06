import { ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateCertificateDto {
  @ApiPropertyOptional()
  pdfUrl?: string;
}
