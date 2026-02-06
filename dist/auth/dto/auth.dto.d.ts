import { UserRole } from '../../users/user.entity';
export declare class RegisterDto {
    fullName: string;
    email: string;
    password: string;
    roles: UserRole[];
    facultyId?: string | null;
    careerId?: string | null;
}
export declare class LoginDto {
    email: string;
    password: string;
}
