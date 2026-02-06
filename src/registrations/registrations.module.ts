import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './registration.entity';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
import { QrCode } from '../qr-codes/qr-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registration, Event, User, QrCode])],
  providers: [RegistrationsService],
  controllers: [RegistrationsController],
  exports: [RegistrationsService]
})
export class RegistrationsModule {}
