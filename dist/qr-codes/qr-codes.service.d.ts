import { Repository } from 'typeorm';
import { QrCode } from './qr-code.entity';
import { RegistrationsService } from '../registrations/registrations.service';
export declare class QrCodesService {
    private readonly qrCodeRepository;
    private readonly registrationsService;
    constructor(qrCodeRepository: Repository<QrCode>, registrationsService: RegistrationsService);
    generateForRegistration(registrationId: string): Promise<QrCode>;
    findByToken(qrToken: string): Promise<QrCode | null>;
    findByRegistration(registrationId: string): Promise<QrCode | null>;
}
