import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RestAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import { CreateReportDTO, UpdateReportDTO } from '../dto/report.dto';
import { ReportService } from '../services/report.service';

@Controller('api/v3/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get('/single/:id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }
  @Get('/applicant/:id')
  findByApplicant(@Param('id') id: string) {
    return this.reportService.findByApplicant(id);
  }
  @Delete('/single/:id')
  delete(@Param('id') id: string) {
    return this.reportService.delete(id);
  }
  @UseGuards(RestAuthGuard)
  @Post()
  create(@Body() data: CreateReportDTO, @Req() req: ReqWithUser) {
    return this.reportService.create(data, req.user);
  }
  @Put()
  update(@Body() data: UpdateReportDTO) {
    return this.reportService.update(data);
  }
  @Post('seed')
  async seed() {
    return await this.reportService.seedReport();
  }
}
