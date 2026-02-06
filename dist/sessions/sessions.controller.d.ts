import { SessionsService } from './sessions.service';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    findAll(eventId?: string): Promise<import("./session.entity").Session[]>;
    findOne(id: string): Promise<import("./session.entity").Session>;
    create(eventId: string, dto: CreateSessionDto): Promise<import("./session.entity").Session>;
    update(id: string, dto: UpdateSessionDto): Promise<import("./session.entity").Session>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
