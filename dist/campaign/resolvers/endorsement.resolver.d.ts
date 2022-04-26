import { ReqWithUser } from 'src/typings';
import { CreateEndorsementDTO } from '../dto/endorsement.dto';
import { EndorsementService } from '../services/endorsement.service';
export declare class EndorsementResolver {
    private readonly endorsementService;
    constructor(endorsementService: EndorsementService);
    getEndorsementsByCampaign(campaign_id: string): Promise<import("../schema/endorsement.schema").Endorsement[]>;
    getEndorsements(): Promise<import("../schema/endorsement.schema").Endorsement[]>;
    createEndorsement(input: CreateEndorsementDTO, req: ReqWithUser): Promise<import("../schema/endorsement.schema").Endorsement>;
    deleteEndorsement(id: string): Promise<import("../schema/endorsement.schema").Endorsement>;
}
