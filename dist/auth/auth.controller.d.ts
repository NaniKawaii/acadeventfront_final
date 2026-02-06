import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            fullName: string;
            email: string;
            roles: string[];
            facultyId: string | null;
            careerId: string | null;
        };
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            fullName: string;
            email: string;
            roles: string[];
            facultyId: string | null;
            careerId: string | null;
        };
    }>;
}
