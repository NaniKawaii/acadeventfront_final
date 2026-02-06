import { CareersService } from './careers.service';
import { CreateCareerDto, UpdateCareerDto } from './dto/career.dto';
export declare class CareersController {
    private readonly careersService;
    constructor(careersService: CareersService);
    findAll(facultyId?: string): Promise<import("./career.entity").Career[]>;
    findOne(id: string): Promise<import("./career.entity").Career>;
    create(dto: CreateCareerDto): Promise<import("./career.entity").Career>;
    update(id: string, dto: UpdateCareerDto): Promise<import("./career.entity").Career>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
