import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Event } from '../events/event.entity';
import { Registration } from '../registrations/registration.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Certificate } from '../certificates/certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Registration, Attendance, Certificate])],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
