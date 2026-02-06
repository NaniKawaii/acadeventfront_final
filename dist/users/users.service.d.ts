import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findOne(id: string): Promise<User>;
    create(dto: CreateUserDto): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
