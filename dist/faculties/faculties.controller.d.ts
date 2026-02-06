import { FacultiesService } from './faculties.service';
import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';
export declare class FacultiesController {
    private readonly facultiesService;
    constructor(facultiesService: FacultiesService);
    findAll(): Promise<import("./faculty.entity").Faculty[]>;
    findOne(id: string): Promise<import("./faculty.entity").Faculty>;
    create(dto: CreateFacultyDto): Promise<import("./faculty.entity").Faculty>;
    update(id: string, dto: UpdateFacultyDto): Promise<import("./faculty.entity").Faculty>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
