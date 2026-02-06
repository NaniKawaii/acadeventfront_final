import { EventModality } from '../event.entity';
export declare class CreateEventDto {
    title: string;
    description: string;
    bannerUrl?: string | null;
    location: string;
    modality: EventModality;
    capacity: number;
    requirements?: string | null;
    startAt: string;
    endAt: string;
    organizerId: string;
    facultyId?: string | null;
    careerId?: string | null;
    speakerIds?: string[];
}
export declare class UpdateEventDto {
    title?: string;
    description?: string;
    bannerUrl?: string | null;
    location?: string;
    modality?: EventModality;
    capacity?: number;
    requirements?: string | null;
    startAt?: string;
    endAt?: string;
    organizerId?: string;
    facultyId?: string | null;
    careerId?: string | null;
    speakerIds?: string[];
}
