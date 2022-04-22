import { UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { WsGuard } from 'src/auth/guards/local.guard';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { Server } from 'ws';
import { CampaignSocketEnum } from '../dto/campaign.interface';
import { Campaign, CampaignDocument } from '../schema/campaign.schema';

@WebSocketGateway({ cors: true })
export class CampaignGateway implements OnGatewayConnection, OnGatewayInit {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  @WebSocketServer() public server: Server;

  handleConnection() {
    this.getCampaignNotice();
  }

  afterInit(server: Server) {
    this.server = server;
    this.getCampaignNotice();
  }

  // @UseGuards(WsGuard)
  // @SubscribeMessage('likeCampaign')
  // async likedCampaign(
  //   @MessageBody() data: { id: string },
  //   @Req() req: ReqWithUser,
  //   @ConnectedSocket() client: Socket,
  // ): Promise<WsResponse<any>> {
  //   const payload = await this.campaignService.like(data.id, req.user);

  //   client.emit('getCampaign', payload);
  //   // const campaigns
  //   return {
  //     data: payload.likes.includes(req.user?.id) ? true : false,
  //     event: 'likeCampaign',
  //   };
  // }
  @UseGuards(WsGuard)
  @SubscribeMessage(CampaignSocketEnum.Created)
  async createdCampaign(
    @MessageBody() data: { campaignTitle: string; user: UserDocument },
  ) {
    const notice = await this.noticeModel.create({
      event: CampaignSocketEnum.Created,
      message: `${data?.user?.firstName} ${data?.user?.lastName} created a campaign <i>${data.campaignTitle}<i> `,
      user: data?.user?.id,
      db_model: 'campaign',
    });
    this.getCampaignNotice();
    return notice;
  }

  @SubscribeMessage(CampaignSocketEnum.Endorsed)
  async endorsedCampaign(
    @MessageBody() data: { campaignTitle: string; user: UserDocument },
  ) {
    const notice = await this.noticeModel.create({
      event: CampaignSocketEnum.Created,
      message: `${data?.user?.firstName} ${data?.user?.lastName} endorsed a campaign <i>${data.campaignTitle}<i> `,
      user: data?.user?.id,
      db_model: 'campaign',
    });
    this.getCampaignNotice();
    return notice;
  }
  @SubscribeMessage(CampaignSocketEnum.Get)
  async getCampaignNotice() {
    const campaigns = await this.noticeModel
      .find({ db_model: 'campaign' })
      .populate('user', 'image, id, firstName, lastName');
    return this.server.emit(CampaignSocketEnum.Get, campaigns);
  }
  @SubscribeMessage(CampaignSocketEnum.Get)
  async getAllNotice(model?: string) {
    if (!model) {
      const notices = await this.noticeModel
        .find()
        .populate('user', 'image, id, firstName, lastName');
      return this.server.emit('all', notices);
    } else {
      const notices = await this.noticeModel
        .find({ db_model: model })
        .populate('user', 'image, id, firstName, lastName');
      return this.server.emit('all', notices);
    }
  }
}
