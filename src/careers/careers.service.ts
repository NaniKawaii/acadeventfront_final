import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from './career.entity';
import { CreateCareerDto, UpdateCareerDto } from './dto/career.dto';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private readonly careersRepository: Repository<Career>
  ) {}

  findAll(facultyId?: string) {
    if (facultyId) {
      return this.careersRepository.find({ where: { facultyId } });
    }
    return this.careersRepository.find();
  }

  async findOne(id: string) {
    const career = await this.careersRepository.findOne({ where: { id } });
    if (!career) {
      throw new NotFoundException('Carrera no encontrada');
    }
    return career;
  }

  create(dto: CreateCareerDto) {
    const career = this.careersRepository.create(dto);
    return this.careersRepository.save(career);
  }

  async update(id: string, dto: UpdateCareerDto) {
    const career = await this.findOne(id);
    Object.assign(career, dto);
    return this.careersRepository.save(career);
  }

  async remove(id: string) {
    const career = await this.findOne(id);
    await this.careersRepository.remove(career);
    return { deleted: true };
  }
}
