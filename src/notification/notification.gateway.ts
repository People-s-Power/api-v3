import { InjectModel } from '@nestjs/mongoose';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { Server } from 'ws';

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayConnection, OnGatewayInit {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}
  @WebSocketServer() public server: Server;

  handleConnection() {
    console.log('hello');
  }

  afterInit(server: Server) {
    this.server = server;

    console.log('hello');
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

  @SubscribeMessage('all')
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
