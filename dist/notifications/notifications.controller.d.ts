import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    listByUser(userId: string): Promise<import("./notification.entity").Notification[]>;
    createForUser(userId: string, message: string): Promise<import("./notification.entity").Notification>;
    markAsRead(notificationId: string): Promise<import("./notification.entity").Notification>;
}
