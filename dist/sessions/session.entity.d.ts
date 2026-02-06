import { Event } from '../events/event.entity';
export declare class Session {
    id: string;
    title: string;
    startAt: Date;
    endAt: Date;
    event: Event;
    eventId: string;
    createdAt: Date;
    updatedAt: Date;
}
