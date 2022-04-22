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
import {
  AssignApplicantDTO,
  CreateApplicantDTO,
  UpdateApplicantDTO,
  UploadContactFormDTO,
} from '../dto/applicant.dto';
import { ApplicantService } from '../services/applicant.service';

@Controller('api/v3/applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}
  @UseGuards(RestAuthGuard)
  @Post()
  async create(@Body() data: CreateApplicantDTO, @Req() req: ReqWithUser) {
    return await this.applicantService.create(data, req.user);
  }

  @Get()
  findAll(@Req() req: ReqWithUser) {
    return this.applicantService.findAll(req?.user);
  }
  @Get('/single/:id')
  findOne(@Param('id') id: string) {
    return this.applicantService.findOne(id);
  }
  @Get('/draft/:id')
  draft(@Param('id') id: string) {
    return this.applicantService.getDraft(id);
  }
  @Put()
  updateApplicant(@Body() data: UpdateApplicantDTO) {
    return this.applicantService.update(data);
  }
  @Delete('/single/:id')
  delete(@Param('id') id: string) {
    return this.applicantService.delete(id);
  }

  @Post('assign')
  async assign(@Body() data: AssignApplicantDTO) {
    const { name, id } = await this.applicantService.assignToUser(data);
    return { name, id };
  }
  @Put('/upload')
  async uploadContactForm(@Body() data: UploadContactFormDTO) {
    return this.applicantService.uploadContactForm(data);
  }
  @Post('/seed')
  async seedApplicants() {
    return this.applicantService.seedApplicants();
  }
}
