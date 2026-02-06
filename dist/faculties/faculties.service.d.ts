import { Repository } from 'typeorm';
import { Faculty } from './faculty.entity';
import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';
export declare class FacultiesService {
    private readonly facultiesRepository;
    constructor(facultiesRepository: Repository<Faculty>);
    findAll(): Promise<Faculty[]>;
    findOne(id: string): Promise<Faculty>;
    create(dto: CreateFacultyDto): Promise<Faculty>;
    update(id: string, dto: UpdateFacultyDto): Promise<Faculty>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
