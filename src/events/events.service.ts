import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { Speaker } from '../speakers/speaker.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Speaker)
    private readonly speakersRepository: Repository<Speaker>
  ) {}

  async findAll(filters: {
    facultyId?: string;
    careerId?: string;
    modality?: string;
    startFrom?: string;
    startTo?: string;
    organizerId?: string;
    title?: string;
  }) {
    const qb = this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.speakers', 'speaker')
      .leftJoinAndSelect('event.faculty', 'faculty')
      .leftJoin('event.registrations', 'registration')
      .addSelect('COUNT(registration.id)', 'event_registrationCount')
      .groupBy('event.id')
      .addGroupBy('speaker.id')
      .addGroupBy('faculty.id');

    if (filters.facultyId) {
      qb.andWhere('event.facultyId = :facultyId', { facultyId: filters.facultyId });
    }
    if (filters.careerId) {
      qb.andWhere('event.careerId = :careerId', { careerId: filters.careerId });
    }
    if (filters.modality) {
      qb.andWhere('event.modality = :modality', { modality: filters.modality });
    }
    if (filters.organizerId) {
      qb.andWhere('event.organizerId = :organizerId', { organizerId: filters.organizerId });
    }
    if (filters.title) {
      qb.andWhere('event.title ILIKE :title', { title: `%${filters.title}%` });
    }
    if (filters.startFrom) {
      qb.andWhere('event.startAt >= :startFrom', { startFrom: new Date(filters.startFrom) });
    }
    if (filters.startTo) {
      qb.andWhere('event.startAt <= :startTo', { startTo: new Date(filters.startTo) });
    }

    const events = await qb.getRawAndEntities();
    return events.entities.map((event, index) => ({
      ...event,
      _count: {
        registrations: parseInt(events.raw[index].event_registrationCount) || 0
      }
    }));
  }

  async findOne(id: string) {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['speakers']
    });
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }
    return event;
  }

  async create(dto: CreateEventDto) {
    const event = this.eventsRepository.create({
      title: dto.title,
      description: dto.description,
      bannerUrl: dto.bannerUrl ?? null,
      location: dto.location,
      modality: dto.modality,
      capacity: dto.capacity,
      requirements: dto.requirements ?? null,
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
      organizerId: dto.organizerId,
      facultyId: dto.facultyId ?? null,
      careerId: dto.careerId ?? null
    });

    if (dto.speakerIds && dto.speakerIds.length > 0) {
      const speakers = await this.speakersRepository.findBy({ id: In(dto.speakerIds) });
      event.speakers = speakers;
    }

    return this.eventsRepository.save(event);
  }

  async update(id: string, dto: UpdateEventDto) {
    const event = await this.findOne(id);
    Object.assign(event, {
      title: dto.title ?? event.title,
      description: dto.description ?? event.description,
      bannerUrl: dto.bannerUrl ?? event.bannerUrl,
      location: dto.location ?? event.location,
      modality: dto.modality ?? event.modality,
      capacity: dto.capacity ?? event.capacity,
      requirements: dto.requirements ?? event.requirements,
      organizerId: dto.organizerId ?? event.organizerId,
      facultyId: dto.facultyId ?? event.facultyId,
      careerId: dto.careerId ?? event.careerId
    });
    if (dto.startAt) {
      event.startAt = new Date(dto.startAt);
    }
    if (dto.endAt) {
      event.endAt = new Date(dto.endAt);
    }
    if (dto.speakerIds) {
      const speakers = await this.speakersRepository.findBy({ id: In(dto.speakerIds) });
      event.speakers = speakers;
    }
    return this.eventsRepository.save(event);
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    await this.eventsRepository.remove(event);
    return { deleted: true };
  }
}
