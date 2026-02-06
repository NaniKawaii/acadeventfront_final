import { User } from '../users/user.entity';
import { Faculty } from '../faculties/faculty.entity';
import { Career } from '../careers/career.entity';
import { Registration } from '../registrations/registration.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Certificate } from '../certificates/certificate.entity';
import { Speaker } from '../speakers/speaker.entity';
export declare enum EventModality {
    PRESENCIAL = "PRESENCIAL",
    VIRTUAL = "VIRTUAL",
    HIBRIDO = "HIBRIDO"
}
export declare class Event {
    id: string;
    title: string;
    description: string;
    bannerUrl: string | null;
    location: string;
    modality: EventModality;
    capacity: number;
    requirements: string | null;
    startAt: Date;
    endAt: Date;
    organizer: User;
    organizerId: string;
    faculty: Faculty;
    facultyId: string | null;
    career: Career;
    careerId: string | null;
    speakers: Speaker[];
    registrations: Registration[];
    attendances: Attendance[];
    certificates: Certificate[];
    createdAt: Date;
}
