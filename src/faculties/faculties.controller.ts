import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FacultiesService } from './faculties.service';
import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Get()
  findAll() {
    return this.facultiesService.findAll();
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultiesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateFacultyDto) {
    return this.facultiesService.create(dto);
  }

  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFacultyDto) {
    return this.facultiesService.update(id, dto);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultiesService.remove(id);
  }
}
