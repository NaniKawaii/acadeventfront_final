import { RegistrationsService } from './registrations.service';
import { RegisterDto } from './dto/registration.dto';
export declare class RegistrationsController {
    private readonly registrationsService;
    constructor(registrationsService: RegistrationsService);
    listByEvent(eventId: string): Promise<import("./registration.entity").Registration[]>;
    listByUser(userId: string): Promise<import("./registration.entity").Registration[]>;
    register(eventId: string, dto: RegisterDto): Promise<import("./registration.entity").Registration>;
    cancel(eventId: string, userId: string): Promise<import("./registration.entity").Registration>;
}
