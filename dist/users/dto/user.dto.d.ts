import { UserRole } from '../user.entity';
export declare class CreateUserDto {
    fullName: string;
    email: string;
    passwordHash: string;
    roles: UserRole[];
    facultyId?: string | null;
    careerId?: string | null;
}
export declare class UpdateUserDto {
    fullName?: string;
    email?: string;
    passwordHash?: string;
    roles?: UserRole[];
    facultyId?: string | null;
    careerId?: string | null;
}
