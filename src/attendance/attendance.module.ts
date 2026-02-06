import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Registration } from '../registrations/registration.entity';
import { QrCode } from '../qr-codes/qr-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Registration, QrCode])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
  exports: [AttendanceService]
})
export class AttendanceModule {}
