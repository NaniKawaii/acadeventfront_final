import { Registration } from '../registrations/registration.entity';
export declare class QrCode {
    id: string;
    registration: Registration;
    registrationId: string;
    qrToken: string;
    createdAt: Date;
}
