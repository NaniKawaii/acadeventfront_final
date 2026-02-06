import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto, UpdateSpeakerDto } from './dto/speaker.dto';

@ApiTags('Speakers')
@Controller('speakers')
export class SpeakersController {
  constructor(private readonly speakersService: SpeakersService) {}

  @Get()
  findAll() {
    return this.speakersService.findAll();
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speakersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSpeakerDto) {
    return this.speakersService.create(dto);
  }

  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSpeakerDto) {
    return this.speakersService.update(id, dto);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speakersService.remove(id);
  }
}
