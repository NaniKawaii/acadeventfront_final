import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(facultyId?: string, careerId?: string, modality?: string, startFrom?: string, startTo?: string, organizerId?: string, title?: string): Promise<{
        _count: {
            registrations: number;
        };
        id: string;
        title: string;
        description: string;
        bannerUrl: string | null;
        location: string;
        modality: import("./event.entity").EventModality;
        capacity: number;
        requirements: string | null;
        startAt: Date;
        endAt: Date;
        organizer: import("../users/user.entity").User;
        organizerId: string;
        faculty: import("../faculties/faculty.entity").Faculty;
        facultyId: string | null;
        career: import("../careers/career.entity").Career;
        careerId: string | null;
        speakers: import("../speakers/speaker.entity").Speaker[];
        registrations: import("../registrations/registration.entity").Registration[];
        attendances: import("../attendance/attendance.entity").Attendance[];
        certificates: import("../certificates/certificate.entity").Certificate[];
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<import("./event.entity").Event>;
    create(dto: CreateEventDto): Promise<import("./event.entity").Event>;
    update(id: string, dto: UpdateEventDto): Promise<import("./event.entity").Event>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
