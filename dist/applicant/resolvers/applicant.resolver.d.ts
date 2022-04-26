import { ApplicantService } from '../services/applicant.service';
import { Applicant } from '../schema/applicant.shema';
import { ReqWithUser } from 'src/typings';
import { UploadContactFormDTO } from '../dto/applicant.dto';
import { UserDocument } from 'src/user/entity/user.schema';
export declare class ApplicantResolver {
    private readonly applicantService;
    constructor(applicantService: ApplicantService);
    getApplicants(user: UserDocument): Promise<Applicant[]>;
    getApplicant(id: string): Promise<Applicant>;
    getUserApplicants(id: string): Promise<import("../schema/applicant.shema").ApplicantDocument[]>;
    showDraft(id: string): Promise<Applicant>;
    createApplicant(input: Applicant, req: ReqWithUser): Promise<Applicant>;
    deleteApplicant(id: string): Promise<Applicant>;
    uploadForm(input: UploadContactFormDTO): Promise<Applicant>;
}
