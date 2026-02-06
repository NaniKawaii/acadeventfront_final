import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrCodesController } from './qr-codes.controller';
import { QrCodesService } from './qr-codes.service';
import { QrCode } from './qr-code.entity';
import { RegistrationsModule } from '../registrations/registrations.module';

@Module({
  imports: [TypeOrmModule.forFeature([QrCode]), RegistrationsModule],
  controllers: [QrCodesController],
  providers: [QrCodesService],
  exports: [QrCodesService],
})
export class QrCodesModule {}