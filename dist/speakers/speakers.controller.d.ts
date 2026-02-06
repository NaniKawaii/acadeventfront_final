import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto, UpdateSpeakerDto } from './dto/speaker.dto';
export declare class SpeakersController {
    private readonly speakersService;
    constructor(speakersService: SpeakersService);
    findAll(): Promise<import("./speaker.entity").Speaker[]>;
    findOne(id: string): Promise<import("./speaker.entity").Speaker>;
    create(dto: CreateSpeakerDto): Promise<import("./speaker.entity").Speaker>;
    update(id: string, dto: UpdateSpeakerDto): Promise<import("./speaker.entity").Speaker>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
