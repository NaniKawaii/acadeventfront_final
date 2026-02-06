import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { Speaker } from '../speakers/speaker.entity';
export declare class EventsService {
    private readonly eventsRepository;
    private readonly speakersRepository;
    constructor(eventsRepository: Repository<Event>, speakersRepository: Repository<Speaker>);
    findAll(filters: {
        facultyId?: string;
        careerId?: string;
        modality?: string;
        startFrom?: string;
        startTo?: string;
        organizerId?: string;
        title?: string;
    }): Promise<{
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
        speakers: Speaker[];
        registrations: import("../registrations/registration.entity").Registration[];
        attendances: import("../attendance/attendance.entity").Attendance[];
        certificates: import("../certificates/certificate.entity").Certificate[];
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<Event>;
    create(dto: CreateEventDto): Promise<Event>;
    update(id: string, dto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
