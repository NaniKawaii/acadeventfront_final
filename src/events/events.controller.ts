import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiQuery({ name: 'facultyId', required: false })
  @ApiQuery({ name: 'careerId', required: false })
  @ApiQuery({ name: 'modality', required: false })
  @ApiQuery({ name: 'startFrom', required: false })
  @ApiQuery({ name: 'startTo', required: false })
  @ApiQuery({ name: 'organizerId', required: false })
  @ApiQuery({ name: 'title', required: false })
  @Get()
  findAll(
    @Query('facultyId') facultyId?: string,
    @Query('careerId') careerId?: string,
    @Query('modality') modality?: string,
    @Query('startFrom') startFrom?: string,
    @Query('startTo') startTo?: string,
    @Query('organizerId') organizerId?: string,
    @Query('title') title?: string
  ) {
    return this.eventsService.findAll({
      facultyId,
      careerId,
      modality,
      startFrom,
      startTo,
      organizerId,
      title
    });
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
