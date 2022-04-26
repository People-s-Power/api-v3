import { Connection, Model, ObjectId } from 'mongoose';
import { IGeo } from 'src/interfaces';
import { NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateCampaignDTO, UpdateCampaignDTO } from '../dto/campaign.dto';
import { CampaignGateway } from '../gateway/campaign.gateway';
import { Campaign, CampaignDocument, ViewDocument } from '../schema/campaign.schema';
import { Endorsement } from '../schema/endorsement.schema';
export declare class ISessionResponseData {
    id: string;
    user: string;
    location: IGeo;
}
export declare class CampaignService {
    private readonly userModel;
    private viewModel;
    private readonly campaignModel;
    private readonly endorsementModel;
    private readonly noticeModel;
    private campaignGateway;
    private connection;
    constructor(userModel: Model<UserDocument>, viewModel: Model<ViewDocument>, campaignModel: Model<CampaignDocument>, endorsementModel: Model<Endorsement>, noticeModel: Model<NoticeDocument>, campaignGateway: CampaignGateway, connection: Connection);
    create(data: CreateCampaignDTO, user: UserDocument): Promise<Campaign>;
    findAll(limit?: number): Promise<Campaign[]>;
    findAllActive(limit?: number): Promise<Campaign[]>;
    findOne(slug: string): Promise<CampaignDocument>;
    update(data: Partial<UpdateCampaignDTO>): Promise<Campaign>;
    delete(id: string): Promise<CampaignDocument>;
    updateSession(id: string, sessionID: string): Promise<CampaignDocument>;
    like(campaign_id: string, user: UserDocument): Promise<CampaignDocument>;
    unLike(campaign_id: string, user: UserDocument): Promise<CampaignDocument>;
    myCampaigns(user_id: string): Promise<Campaign[]>;
    approveCampaign(campaign_id: string): Promise<CampaignDocument>;
    viewedBy(id: string, userId: string): Promise<string>;
    findAllNotice(model?: string): Promise<NoticeDocument[]>;
    feature(campaign_id: ObjectId): Promise<CampaignDocument>;
    session(_id: string): Promise<ISessionResponseData>;
}
