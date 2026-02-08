import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
export declare class NotificationsService {
    private readonly notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    listByUser(userId: string): Promise<Notification[]>;
    createForUser(userId: string, message: string): Promise<Notification>;
    markAsRead(notificationId: string): Promise<Notification>;
}
