"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./event.entity");
const speaker_entity_1 = require("../speakers/speaker.entity");
let EventsService = class EventsService {
    constructor(eventsRepository, speakersRepository) {
        this.eventsRepository = eventsRepository;
        this.speakersRepository = speakersRepository;
    }
    async findAll(filters) {
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
    async findOne(id) {
        const event = await this.eventsRepository.findOne({
            where: { id },
            relations: ['speakers']
        });
        if (!event) {
            throw new common_1.NotFoundException('Evento no encontrado');
        }
        return event;
    }
    async create(dto) {
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
            const speakers = await this.speakersRepository.findBy({ id: (0, typeorm_2.In)(dto.speakerIds) });
            event.speakers = speakers;
        }
        return this.eventsRepository.save(event);
    }
    async update(id, dto) {
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
            const speakers = await this.speakersRepository.findBy({ id: (0, typeorm_2.In)(dto.speakerIds) });
            event.speakers = speakers;
        }
        return this.eventsRepository.save(event);
    }
    async remove(id) {
        const event = await this.findOne(id);
        await this.eventsRepository.remove(event);
        return { deleted: true };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(speaker_entity_1.Speaker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map