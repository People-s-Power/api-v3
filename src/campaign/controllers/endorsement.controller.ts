import {
  Body,
  Controller,
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
  CreateEndorsementDTO,
  LikeEndorsementDTO,
  UpdateEndorsementDTO,
} from '../dto/endorsement.dto';
import { EndorsementService } from '../services/endorsement.service';

@Controller('api/v3/endorsement')
export class EndorsementController {
  constructor(private readonly endorsementService: EndorsementService) {}

  @Get()
  findAll() {
    return this.endorsementService.findAll();
  }
  @Get('/single/:id')
  findOne(@Param('id') id: string) {
    return this.endorsementService.findOne(id);
  }
  @Get('/campaign/:id')
  findByCampaign(@Param('id') id: string) {
    return this.endorsementService.findByCampaign(id);
  }
  @UseGuards(RestAuthGuard)
  @Post()
  create(@Body() data: CreateEndorsementDTO, @Req() req: ReqWithUser) {
    console.log(data)
    return this.endorsementService.create(data, req.user);
  }
  @UseGuards(RestAuthGuard)
  @Put()
  update(@Body() data: UpdateEndorsementDTO) {
    return this.endorsementService.update(data);
  }
  @UseGuards(RestAuthGuard)
  @Post('like')
  like(@Body() data: LikeEndorsementDTO, @Req() req: ReqWithUser) {
    return this.endorsementService.like(data, req.user);
  }
}
