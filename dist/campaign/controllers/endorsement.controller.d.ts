import { ReqWithUser } from 'src/typings';
import { CreateEndorsementDTO, LikeEndorsementDTO, UpdateEndorsementDTO } from '../dto/endorsement.dto';
import { EndorsementService } from '../services/endorsement.service';
export declare class EndorsementController {
    private readonly endorsementService;
    constructor(endorsementService: EndorsementService);
    findAll(): Promise<import("../schema/endorsement.schema").Endorsement[]>;
    findOne(id: string): Promise<import("../schema/endorsement.schema").Endorsement>;
    findByCampaign(id: string): Promise<import("../schema/endorsement.schema").Endorsement[]>;
    create(data: CreateEndorsementDTO, req: ReqWithUser): Promise<import("../schema/endorsement.schema").Endorsement>;
    update(data: UpdateEndorsementDTO): Promise<import("../schema/endorsement.schema").Endorsement>;
    like(data: LikeEndorsementDTO, req: ReqWithUser): Promise<boolean>;
}
