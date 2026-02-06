import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CareersService } from './careers.service';
import { CreateCareerDto, UpdateCareerDto } from './dto/career.dto';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @ApiQuery({ name: 'facultyId', required: false })
  @Get()
  findAll(@Query('facultyId') facultyId?: string) {
    return this.careersService.findAll(facultyId);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCareerDto) {
    return this.careersService.create(dto);
  }

  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCareerDto) {
    return this.careersService.update(id, dto);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careersService.remove(id);
  }
}
