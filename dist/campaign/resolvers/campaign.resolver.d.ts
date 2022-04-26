import { UserDocument } from 'src/user/entity/user.schema';
import { CampaignService } from '../services/campaign.service';
import { EndorsementService } from '../services/endorsement.service';
export declare class CampaignResolver {
    private readonly campaignService;
    private readonly endorsementService;
    constructor(campaignService: CampaignService, endorsementService: EndorsementService);
    myCampaign(user: UserDocument): Promise<import("../schema/campaign.schema").Campaign[]>;
    getCampaigns(limit: number): Promise<import("../schema/campaign.schema").Campaign[]>;
    getCampaign(slug: string): Promise<import("../schema/campaign.schema").CampaignDocument>;
    getActiveCampaigns(): Promise<import("../schema/campaign.schema").Campaign[]>;
    deleteCampaign(id: string): Promise<import("../schema/campaign.schema").CampaignDocument>;
}
