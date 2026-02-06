import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { RegistrationsService } from './registrations.service';
import { RegisterDto } from './dto/registration.dto';

@ApiTags('Registrations')
@Controller()
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @ApiParam({ name: 'eventId' })
  @Get('events/:eventId/registrations')
  listByEvent(@Param('eventId') eventId: string) {
    return this.registrationsService.listByEvent(eventId);
  }

  @ApiParam({ name: 'userId' })
  @Get('users/:userId/registrations')
  listByUser(@Param('userId') userId: string) {
    return this.registrationsService.listByUser(userId);
  }

  @ApiParam({ name: 'eventId' })
  @Post('events/:eventId/registrations')
  register(@Param('eventId') eventId: string, @Body() dto: RegisterDto) {
    return this.registrationsService.register(eventId, dto.userId);
  }

  @ApiParam({ name: 'eventId' })
  @ApiParam({ name: 'userId' })
  @Delete('events/:eventId/registrations/:userId')
  cancel(@Param('eventId') eventId: string, @Param('userId') userId: string) {
    return this.registrationsService.cancel(eventId, userId);
  }
}
