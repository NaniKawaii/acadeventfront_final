import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';
export declare class SessionsService {
    private readonly sessionsRepository;
    constructor(sessionsRepository: Repository<Session>);
    findAll(eventId?: string): Promise<Session[]>;
    findOne(id: string): Promise<Session>;
    create(eventId: string, dto: CreateSessionDto): Promise<Session>;
    update(id: string, dto: UpdateSessionDto): Promise<Session>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
