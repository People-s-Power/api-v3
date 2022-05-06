import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateEndorsementDTO, LikeEndorsementDTO, UpdateEndorsementDTO } from '../dto/endorsement.dto';
import { CampaignGateway } from '../gateway/campaign.gateway';
import { CampaignDocument } from '../schema/campaign.schema';
import { Endorsement, EndorsementDocument } from '../schema/endorsement.schema';
export declare class EndorsementService {
    private readonly userModel;
    private readonly endorsementModel;
    private readonly CampaignModel;
    private campaignGateway;
    constructor(userModel: Model<UserDocument>, endorsementModel: Model<EndorsementDocument>, CampaignModel: Model<CampaignDocument>, campaignGateway: CampaignGateway);
    create(data: CreateEndorsementDTO, user: UserDocument): Promise<Endorsement>;
    findAll(): Promise<Endorsement[]>;
    findByCampaign(campaign: any): Promise<Endorsement[]>;
    findOne(id: string): Promise<Endorsement>;
    update(data: UpdateEndorsementDTO): Promise<Endorsement>;
    like(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean>;
    unLike(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean>;
    delete(id: string): Promise<Endorsement>;
    deleteMany(): Promise<number>;
}
