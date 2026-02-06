import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './speaker.entity';
import { CreateSpeakerDto, UpdateSpeakerDto } from './dto/speaker.dto';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker)
    private readonly speakersRepository: Repository<Speaker>
  ) {}

  findAll() {
    return this.speakersRepository.find();
  }

  async findOne(id: string) {
    const speaker = await this.speakersRepository.findOne({ where: { id } });
    if (!speaker) {
      throw new NotFoundException('Ponente no encontrado');
    }
    return speaker;
  }

  create(dto: CreateSpeakerDto) {
    const speaker = this.speakersRepository.create(dto);
    return this.speakersRepository.save(speaker);
  }

  async update(id: string, dto: UpdateSpeakerDto) {
    const speaker = await this.findOne(id);
    Object.assign(speaker, dto);
    return this.speakersRepository.save(speaker);
  }

  async remove(id: string) {
    const speaker = await this.findOne(id);
    await this.speakersRepository.remove(speaker);
    return { deleted: true };
  }
}
