import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
export declare class Certificate {
    id: string;
    event: Event;
    eventId: string;
    user: User;
    userId: string;
    verificationCode: string;
    pdfUrl: string | null;
    issuedAt: Date;
}
