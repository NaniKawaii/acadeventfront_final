import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
import { GenerateCertificateDto } from './dto/certificate.dto';
export declare class CertificatesService {
    private readonly certificatesRepository;
    private readonly attendanceRepository;
    private readonly eventsRepository;
    private readonly usersRepository;
    constructor(certificatesRepository: Repository<Certificate>, attendanceRepository: Repository<Attendance>, eventsRepository: Repository<Event>, usersRepository: Repository<User>);
    listByUser(userId: string): Promise<Certificate[]>;
    generate(eventId: string, userId: string, dto: GenerateCertificateDto): Promise<Certificate>;
    verify(code: string): Promise<Certificate>;
    private generatePdf;
}
