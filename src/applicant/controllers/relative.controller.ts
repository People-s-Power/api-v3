import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRelativeDTO, UpdateRelativeDTO } from '../dto/relative.dto';
import { RelativeService } from '../services/relative.service';

@Controller('api/v3/relative')
export class RelativeController {
  constructor(private readonly relativeService: RelativeService) {}
  @Post()
  create(@Body() data: CreateRelativeDTO) {
    return this.relativeService.create(data);
  }
  @Put()
  update(@Body() data: UpdateRelativeDTO) {
    return this.relativeService.update(data);
  }
  @Delete('/single/:id')
  delete(@Param('id') id: string) {
    return this.relativeService.delete(id);
  }
  @Get()
  findAll() {
    return this.relativeService.findAll();
  }
  @Get('/single/:id')
  async findOne(@Param('id') id: string) {
    return await this.relativeService.findOne(id);
  }
  @Get('/applicant/:id')
  async findByApplicant(@Param('id') id: string) {
    return await this.relativeService.findByApplicantId(id);
  }
  @Post('seed')
  async seedRelatives() {
    return this.relativeService.seedRelatives();
  }
}
