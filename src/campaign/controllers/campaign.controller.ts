import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RestAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import { CreateCampaignDTO, UpdateCampaignDTO } from '../dto/campaign.dto';
import { CampaignGateway } from '../gateway/campaign.gateway';
import {
  CampaignService,
  ISessionResponseData,
} from '../services/campaign.service';

@Controller('api/v3/campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly campaignGateway: CampaignGateway,
  ) {}
  @UseGuards(RestAuthGuard)
  @Post()
  create(@Body() data: CreateCampaignDTO, @Req() req: ReqWithUser) {
    return this.campaignService.create(data, req.user);
  }
  @Get('session/:id')
  async getSession(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ISessionResponseData> {
    const campaign = await this.campaignService.updateSession(
      id,
      req.sessionID,
    );
    return campaign.id;
  }
  // @Get('notice')
  // getAllnotice() {
  //   console.log('hello from controller');
  //   return this.campaignService.findAllNotice();
  // }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }
  @Get('notice')
  findAllNotice(@Query('model') model: string) {
    return this.campaignService.findAllNotice(model);
  }
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.campaignService.findOne(slug);
  }
  @UseGuards(RestAuthGuard)
  @Get('mycampaign')
  async myCampaign(@Req() req: ReqWithUser) {
    return this.campaignService.myCampaigns(req?.user?.id);
  }
  @Put()
  update(@Body() data: UpdateCampaignDTO) {
    return this.campaignService.update(data);
  }
  @UseGuards(RestAuthGuard)
  @Delete('/single/:id')
  async delete(@Param('id') id: string) {
    const campaign = await this.campaignService.delete(id);
    return campaign.id;
  }
  @UseGuards(RestAuthGuard)
  @Post('like')
  async like(@Body('id') id: string, @Req() req: ReqWithUser) {
    return await this.campaignService.like(id, req.user);
  }
  @Post('approve')
  async approveCampaign(@Body() data: { campaign_id: string }) {
    return await this.campaignService.approveCampaign(data.campaign_id);
  }
  
  @Put('/viewCamp/:id')
  async viewCamp(
    @Param('id') id: string,
    @Body() data: { userId: string; }
    ): Promise<string> {
    const userId = data.userId
    const result = await this.campaignService.viewedBy(
      id,
      userId
    )

    return result;
  }
}
