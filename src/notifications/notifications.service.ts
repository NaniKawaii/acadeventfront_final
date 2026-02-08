import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>
  ) {}

  listByUser(userId: string) {
    return this.notificationsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });
  }

  async createForUser(userId: string, message: string) {
    const notification = this.notificationsRepository.create({
      userId,
      message,
      isRead: false
    });
    return this.notificationsRepository.save(notification);
  }

  async markAsRead(notificationId: string) {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId }
    });
    if (!notification) {
      throw new NotFoundException('Notificación no encontrada');
    }
    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }
}
