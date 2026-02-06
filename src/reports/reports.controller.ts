import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiParam({ name: 'eventId' })
  @Get('events/:eventId')
  eventReport(@Param('eventId') eventId: string) {
    return this.reportsService.eventReport(eventId);
  }

  @ApiQuery({ name: 'facultyId', required: false })
  @ApiQuery({ name: 'start', required: false })
  @ApiQuery({ name: 'end', required: false })
  @Get('summary')
  summary(
    @Query('facultyId') facultyId?: string,
    @Query('start') start?: string,
    @Query('end') end?: string
  ) {
    return this.reportsService.summary({ facultyId, start, end });
  }
}
