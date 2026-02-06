import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
export declare enum RegistrationStatus {
    INSCRITO = "INSCRITO",
    CANCELADO = "CANCELADO",
    LISTA_ESPERA = "LISTA_ESPERA"
}
export declare class Registration {
    id: string;
    event: Event;
    eventId: string;
    user: User;
    userId: string;
    status: RegistrationStatus;
    registeredAt: Date;
}
