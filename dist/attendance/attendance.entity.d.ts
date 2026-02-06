import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
export declare enum AttendanceMethod {
    MANUAL = "MANUAL",
    QR = "QR"
}
export declare class Attendance {
    id: string;
    event: Event;
    eventId: string;
    user: User;
    userId: string;
    checkInTime: Date | null;
    present: boolean;
    method: AttendanceMethod | null;
}
