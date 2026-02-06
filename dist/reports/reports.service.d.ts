import { Repository } from 'typeorm';
import { Event } from '../events/event.entity';
import { Registration } from '../registrations/registration.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Certificate } from '../certificates/certificate.entity';
export declare class ReportsService {
    private readonly eventsRepository;
    private readonly registrationsRepository;
    private readonly attendanceRepository;
    private readonly certificatesRepository;
    constructor(eventsRepository: Repository<Event>, registrationsRepository: Repository<Registration>, attendanceRepository: Repository<Attendance>, certificatesRepository: Repository<Certificate>);
    eventReport(eventId: string): Promise<{
        eventId: string;
        capacity: number;
        registered: number;
        waiting: number;
        cancelled: number;
        present: number;
        absent: number;
        attendanceRate: number;
    }>;
    summary(filters: {
        facultyId?: string;
        start?: string;
        end?: string;
    }): Promise<{
        totalEvents: number;
        totalRegistrations: number;
        totalAttendance: number;
        totalCertified: number;
    }>;
}
