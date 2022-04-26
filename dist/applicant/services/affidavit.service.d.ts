import { Model } from 'mongoose';
import { CreateAffidavitDTO, UpdateAffidavitDTO } from '../dto/affidavit.dto';
import { Affidavit, AffidavitDocument } from '../schema/affidavit.schema';
import { ApplicantDocument } from '../schema/applicant.shema';
export declare class AffidavitService {
    private readonly affidavitRepo;
    private readonly applicantModel;
    constructor(affidavitRepo: Model<AffidavitDocument>, applicantModel: Model<ApplicantDocument>);
    findAll(): Promise<Affidavit[]>;
    findByApplicant(applicant_id: any): Promise<Affidavit>;
    findOne(id: string): Promise<Affidavit>;
    create(data: Partial<CreateAffidavitDTO | UpdateAffidavitDTO>): Promise<Affidavit>;
    update(data: Partial<UpdateAffidavitDTO>): Promise<Affidavit>;
    deleteAffidavit(id: string): Promise<Affidavit>;
    deleteAllAffidavitWithoutApplicants(): Promise<Affidavit[]>;
    seedAffidavit(): Promise<(Affidavit & Document & {
        _id: any;
        id: any;
        _doc: any;
    } & import("mongoose").Document<any, any, AffidavitDocument>)[]>;
}
