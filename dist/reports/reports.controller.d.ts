import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
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
    summary(facultyId?: string, start?: string, end?: string): Promise<{
        totalEvents: number;
        totalRegistrations: number;
        totalAttendance: number;
        totalCertified: number;
    }>;
}
