import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    private hashPassword;
    private verifyPassword;
    private toSafeUser;
}
