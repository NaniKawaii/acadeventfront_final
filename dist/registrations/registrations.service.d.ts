import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
import { QrCode } from '../qr-codes/qr-code.entity';
export declare class RegistrationsService {
    private readonly registrationsRepository;
    private readonly eventsRepository;
    private readonly usersRepository;
    private readonly qrCodesRepository;
    constructor(registrationsRepository: Repository<Registration>, eventsRepository: Repository<Event>, usersRepository: Repository<User>, qrCodesRepository: Repository<QrCode>);
    listByEvent(eventId: string): Promise<Registration[]>;
    listByUser(userId: string): Promise<Registration[]>;
    register(eventId: string, userId: string): Promise<Registration>;
    cancel(eventId: string, userId: string): Promise<Registration>;
    findOne(id: string): Promise<Registration | null>;
}
