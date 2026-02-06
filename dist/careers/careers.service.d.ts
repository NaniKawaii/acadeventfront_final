import { Repository } from 'typeorm';
import { Career } from './career.entity';
import { CreateCareerDto, UpdateCareerDto } from './dto/career.dto';
export declare class CareersService {
    private readonly careersRepository;
    constructor(careersRepository: Repository<Career>);
    findAll(facultyId?: string): Promise<Career[]>;
    findOne(id: string): Promise<Career>;
    create(dto: CreateCareerDto): Promise<Career>;
    update(id: string, dto: UpdateCareerDto): Promise<Career>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
