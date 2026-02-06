import { QrCodesService } from './qr-codes.service';
export declare class QrCodesController {
    private readonly qrCodesService;
    constructor(qrCodesService: QrCodesService);
    generate(registrationId: string): Promise<import("./qr-code.entity").QrCode>;
    getByRegistration(registrationId: string): Promise<import("./qr-code.entity").QrCode | null>;
    verify(token: string): Promise<import("./qr-code.entity").QrCode | null>;
}
