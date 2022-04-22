import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateExhibitDTO, UpdateExhibitDTO } from '../dto/exhibit.dto';
import { ExhibitService } from '../services/exhibit.service';

@Controller('api/v3/exhibit')
export class ExhibitController {
  constructor(private readonly exhibitService: ExhibitService) {}
  @Post()
  create(@Body() data: CreateExhibitDTO) {
    return this.exhibitService.create(data);
  }
  @Get()
  findAll() {
    return this.exhibitService.findAll();
  }
  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.exhibitService.findOne(id);
  }
  @Put()
  update(@Body() data: UpdateExhibitDTO) {
    return this.exhibitService.update(data);
  }
  @Delete('/single/:id')
  delete(@Param('id') id: string) {
    return this.exhibitService.deleteOne(id);
  }
  @Get('applicant/:id')
  findByApplicant(@Param('id') id: string) {
    return this.exhibitService.findByApplicant(id);
  }
  @Post('seed')
  seedExhibits() {
    return this.exhibitService.seedExhibits();
  }
}
