import { Request } from 'express';
import { ReqWithUser } from 'src/typings';
import { CreateCampaignDTO, UpdateCampaignDTO } from '../dto/campaign.dto';
import { CampaignGateway } from '../gateway/campaign.gateway';
import { CampaignService, ISessionResponseData } from '../services/campaign.service';
export declare class CampaignController {
    private readonly campaignService;
    private readonly campaignGateway;
    constructor(campaignService: CampaignService, campaignGateway: CampaignGateway);
    create(data: CreateCampaignDTO, req: ReqWithUser): Promise<import("../schema/campaign.schema").Campaign>;
    getSession(id: string, req: Request): Promise<ISessionResponseData>;
    findAll(): Promise<import("../schema/campaign.schema").Campaign[]>;
    findAllNotice(model: string): Promise<import("../../notification/notification.schema").NoticeDocument[]>;
    findOne(slug: string): Promise<import("../schema/campaign.schema").CampaignDocument>;
    myCampaign(req: ReqWithUser): Promise<import("../schema/campaign.schema").Campaign[]>;
    update(data: UpdateCampaignDTO): Promise<import("../schema/campaign.schema").Campaign>;
    delete(id: string): Promise<any>;
    like(id: string, req: ReqWithUser): Promise<import("../schema/campaign.schema").CampaignDocument>;
    approveCampaign(data: {
        campaign_id: string;
    }): Promise<import("../schema/campaign.schema").CampaignDocument>;
    viewCamp(id: string, data: {
        userId: string;
    }): Promise<string>;
}
