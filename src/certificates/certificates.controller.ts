import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';
import { GenerateCertificateDto } from './dto/certificate.dto';

@ApiTags('Certificates')
@Controller()
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @ApiParam({ name: 'userId' })
  @Get('users/:userId/certificates')
  listByUser(@Param('userId') userId: string) {
    return this.certificatesService.listByUser(userId);
  }

  @ApiParam({ name: 'eventId' })
  @ApiParam({ name: 'userId' })
  @Post('events/:eventId/certificates/:userId')
  generate(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
    @Body() dto: GenerateCertificateDto
  ) {
    return this.certificatesService.generate(eventId, userId, dto);
  }

  @ApiParam({ name: 'code' })
  @Get('certificates/verify/:code')
  verify(@Param('code') code: string) {
    return this.certificatesService.verify(code);
  }

  @ApiParam({ name: 'id' })
  @Get('certificates/:id/download')
  async download(@Param('id') id: string, @Res() res: any) {
    const filePath = await this.certificatesService.getPdfPath(id);
    return res.sendFile(filePath);
  }
}
