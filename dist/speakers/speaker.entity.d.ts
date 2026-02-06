import { Event } from '../events/event.entity';
export declare class Speaker {
    id: string;
    fullName: string;
    bio: string | null;
    photoUrl: string | null;
    events: Event[];
}
