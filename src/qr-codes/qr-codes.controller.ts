import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QrCodesService } from './qr-codes.service';

@ApiTags('QR Codes')
@Controller('qr-codes')
export class QrCodesController {
  constructor(private readonly qrCodesService: QrCodesService) {}

  @ApiParam({ name: 'registrationId' })
  @Post('registrations/:registrationId')
  generate(@Param('registrationId') registrationId: string) {
    return this.qrCodesService.generateForRegistration(registrationId);
  }

  @ApiParam({ name: 'registrationId' })
  @Get('registrations/:registrationId')
  getByRegistration(@Param('registrationId') registrationId: string) {
    return this.qrCodesService.findByRegistration(registrationId);
  }

  @ApiParam({ name: 'token' })
  @Get('verify/:token')
  verify(@Param('token') token: string) {
    return this.qrCodesService.findByToken(token);
  }
}