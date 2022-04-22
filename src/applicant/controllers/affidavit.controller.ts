import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAffidavitDTO, UpdateAffidavitDTO } from '../dto/affidavit.dto';
import { Affidavit } from '../schema/affidavit.schema';
import { AffidavitService } from '../services/affidavit.service';

@Controller('api/v3/affidavit')
export class AffidavitController {
  constructor(private readonly affidavitService: AffidavitService) {}

  @Get()
  findAll() {
    return this.affidavitService.findAll();
  }
  @Get('/single/:id')
  findOne(@Param('id') id: string) {
    return this.affidavitService.findOne(id);
  }
  @Post()
  create(@Body() data: CreateAffidavitDTO) {
    return this.affidavitService.create(data);
  }
  @Put()
  update(@Body() data: UpdateAffidavitDTO) {
    return this.affidavitService.update(data);
  }
  @Delete('/single/:id')
  delete(@Param('id') id: string): Promise<Affidavit> {
    return this.affidavitService.deleteAffidavit(id);
  }
  @Post('seed')
  seedAffidavit() {
    return this.affidavitService.seedAffidavit();
  }
}
