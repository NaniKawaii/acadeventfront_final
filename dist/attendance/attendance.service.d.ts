import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Registration } from '../registrations/registration.entity';
import { ManualAttendanceDto, QrAttendanceDto } from './dto/attendance.dto';
import { QrCode } from '../qr-codes/qr-code.entity';
export declare class AttendanceService {
    private readonly attendanceRepository;
    private readonly registrationsRepository;
    private readonly qrCodesRepository;
    constructor(attendanceRepository: Repository<Attendance>, registrationsRepository: Repository<Registration>, qrCodesRepository: Repository<QrCode>);
    listByEvent(eventId: string): Promise<Attendance[]>;
    markManual(eventId: string, dto: ManualAttendanceDto): Promise<Attendance>;
    markByQr(eventId: string, dto: QrAttendanceDto): Promise<Attendance>;
    private upsertAttendance;
}
