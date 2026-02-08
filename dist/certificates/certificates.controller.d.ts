import { CertificatesService } from './certificates.service';
import { GenerateCertificateDto } from './dto/certificate.dto';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    listByUser(userId: string): Promise<import("./certificate.entity").Certificate[]>;
    generate(eventId: string, userId: string, dto: GenerateCertificateDto): Promise<import("./certificate.entity").Certificate>;
    verify(code: string): Promise<import("./certificate.entity").Certificate>;
    download(id: string, res: any): Promise<any>;
}
