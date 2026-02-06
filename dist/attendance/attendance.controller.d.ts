import { AttendanceService } from './attendance.service';
import { ManualAttendanceDto, QrAttendanceDto } from './dto/attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    list(eventId: string): Promise<import("./attendance.entity").Attendance[]>;
    markManual(eventId: string, dto: ManualAttendanceDto): Promise<import("./attendance.entity").Attendance>;
    markQr(eventId: string, dto: QrAttendanceDto): Promise<import("./attendance.entity").Attendance>;
}
