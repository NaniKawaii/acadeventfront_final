import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.entity").User[]>;
    findOne(id: string): Promise<import("./user.entity").User>;
    create(dto: CreateUserDto): Promise<import("./user.entity").User>;
    update(id: string, dto: UpdateUserDto): Promise<import("./user.entity").User>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
