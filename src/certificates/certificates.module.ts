import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { Attendance } from '../attendance/attendance.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate, Attendance, Event, User])],
  providers: [CertificatesService],
  controllers: [CertificatesController],
  exports: [CertificatesService]
})
export class CertificatesModule {}
