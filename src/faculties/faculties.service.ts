import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './faculty.entity';
import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultiesRepository: Repository<Faculty>
  ) {}

  findAll() {
    return this.facultiesRepository.find();
  }

  async findOne(id: string) {
    const faculty = await this.facultiesRepository.findOne({ where: { id } });
    if (!faculty) {
      throw new NotFoundException('Facultad no encontrada');
    }
    return faculty;
  }

  create(dto: CreateFacultyDto) {
    const faculty = this.facultiesRepository.create(dto);
    return this.facultiesRepository.save(faculty);
  }

  async update(id: string, dto: UpdateFacultyDto) {
    const faculty = await this.findOne(id);
    Object.assign(faculty, dto);
    return this.facultiesRepository.save(faculty);
  }

  async remove(id: string) {
    const faculty = await this.findOne(id);
    await this.facultiesRepository.remove(faculty);
    return { deleted: true };
  }
}
