import { ReqWithUser } from 'src/typings';
import { AssignApplicantDTO, CreateApplicantDTO, UpdateApplicantDTO, UploadContactFormDTO } from '../dto/applicant.dto';
import { ApplicantService } from '../services/applicant.service';
export declare class ApplicantController {
    private readonly applicantService;
    constructor(applicantService: ApplicantService);
    create(data: CreateApplicantDTO, req: ReqWithUser): Promise<import("../schema/applicant.shema").Applicant>;
    findAll(req: ReqWithUser): Promise<import("../schema/applicant.shema").Applicant[]>;
    findOne(id: string): Promise<import("../schema/applicant.shema").Applicant>;
    draft(id: string): Promise<import("../schema/applicant.shema").Applicant>;
    updateApplicant(data: UpdateApplicantDTO): Promise<import("../schema/applicant.shema").Applicant>;
    delete(id: string): Promise<import("../schema/applicant.shema").Applicant>;
    assign(data: AssignApplicantDTO): Promise<{
        name: string;
        id: any;
    }>;
    uploadContactForm(data: UploadContactFormDTO): Promise<import("../schema/applicant.shema").Applicant>;
    seedApplicants(): Promise<import("../schema/applicant.shema").ApplicantDocument[]>;
}
