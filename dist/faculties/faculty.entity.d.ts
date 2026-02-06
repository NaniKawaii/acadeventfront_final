import { Career } from '../careers/career.entity';
import { Event } from '../events/event.entity';
export declare class Faculty {
    id: string;
    name: string;
    careers: Career[];
    events: Event[];
}
