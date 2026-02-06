import { Repository } from 'typeorm';
import { Speaker } from './speaker.entity';
import { CreateSpeakerDto, UpdateSpeakerDto } from './dto/speaker.dto';
export declare class SpeakersService {
    private readonly speakersRepository;
    constructor(speakersRepository: Repository<Speaker>);
    findAll(): Promise<Speaker[]>;
    findOne(id: string): Promise<Speaker>;
    create(dto: CreateSpeakerDto): Promise<Speaker>;
    update(id: string, dto: UpdateSpeakerDto): Promise<Speaker>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
