import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { Server } from 'ws';
import { CampaignDocument } from '../schema/campaign.schema';
export declare class CampaignGateway implements OnGatewayConnection, OnGatewayInit {
    private noticeModel;
    private readonly campaignModel;
    constructor(noticeModel: Model<NoticeDocument>, campaignModel: Model<CampaignDocument>);
    server: Server;
    handleConnection(): void;
    afterInit(server: Server): void;
    createdCampaign(data: {
        campaignTitle: string;
        user: UserDocument;
    }): Promise<NoticeDocument>;
    endorsedCampaign(data: {
        campaignTitle: string;
        user: UserDocument;
    }): Promise<NoticeDocument>;
    getCampaignNotice(): Promise<boolean>;
    getAllNotice(model?: string): Promise<boolean>;
}
