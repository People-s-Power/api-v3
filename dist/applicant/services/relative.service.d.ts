import { Model } from 'mongoose';
import { CreateRelativeDTO, UpdateRelativeDTO } from '../dto/relative.dto';
import { Relative, RelativeDocument } from '../schema/relative.schema';
import { ApplicantService } from './applicant.service';
export declare class RelativeService {
    private readonly relativeModel;
    private readonly applicantService;
    constructor(relativeModel: Model<RelativeDocument>, applicantService: ApplicantService);
    create(data: CreateRelativeDTO): Promise<Relative>;
    update(data: UpdateRelativeDTO): Promise<Relative>;
    delete(id: string): Promise<Relative>;
    findAll(): Promise<Relative[]>;
    findOne(id: string): Promise<Relative>;
    findByApplicantId(applicant_id: any): Promise<Relative[]>;
    seedRelatives(): Promise<RelativeDocument>;
}
