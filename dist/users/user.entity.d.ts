import { Event } from '../events/event.entity';
import { Registration } from '../registrations/registration.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Certificate } from '../certificates/certificate.entity';
export declare enum UserRole {
    ADMIN = "ADMIN",
    ORGANIZADOR = "ORGANIZADOR",
    ASISTENTE = "ASISTENTE",
    SCANNER = "SCANNER"
}
export declare class User {
    id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    roles: UserRole[];
    facultyId: string | null;
    careerId: string | null;
    organizedEvents: Event[];
    registrations: Registration[];
    attendances: Attendance[];
    certificates: Certificate[];
    createdAt: Date;
}
