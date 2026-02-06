import { Faculty } from '../faculties/faculty.entity';
import { Event } from '../events/event.entity';
export declare class Career {
    id: string;
    name: string;
    faculty: Faculty;
    facultyId: string;
    events: Event[];
}
