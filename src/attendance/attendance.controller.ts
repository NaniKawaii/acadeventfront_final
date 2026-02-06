import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { ManualAttendanceDto, QrAttendanceDto } from './dto/attendance.dto';

@ApiTags('Attendance')
@Controller('events/:eventId/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiParam({ name: 'eventId' })
  @Get()
  list(@Param('eventId') eventId: string) {
    return this.attendanceService.listByEvent(eventId);
  }

  @ApiParam({ name: 'eventId' })
  @Post('manual')
  markManual(@Param('eventId') eventId: string, @Body() dto: ManualAttendanceDto) {
    return this.attendanceService.markManual(eventId, dto);
  }

  @ApiParam({ name: 'eventId' })
  @Post('qr')
  markQr(@Param('eventId') eventId: string, @Body() dto: QrAttendanceDto) {
    return this.attendanceService.markByQr(eventId, dto);
  }
}
