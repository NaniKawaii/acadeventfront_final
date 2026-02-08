import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiParam({ name: 'userId' })
  @Get('users/:userId')
  listByUser(@Param('userId') userId: string) {
    return this.notificationsService.listByUser(userId);
  }

  @ApiParam({ name: 'userId' })
  @Post('users/:userId')
  createForUser(@Param('userId') userId: string, @Body('message') message: string) {
    return this.notificationsService.createForUser(userId, message);
  }

  @ApiParam({ name: 'notificationId' })
  @Patch(':notificationId/read')
  markAsRead(@Param('notificationId') notificationId: string) {
    return this.notificationsService.markAsRead(notificationId);
  }
}
