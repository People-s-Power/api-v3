import { Applicant } from '../schema/applicant.shema';
export declare class CreateAffidavitDTO {
    name: string;
    address: string;
    title: string;
    religion: string;
    occupation: string;
    rel: string;
    gender: string;
    applicant: string | Applicant;
}
declare const UpdateAffidavitDTO_base: import("@nestjs/common").Type<Partial<CreateAffidavitDTO>>;
export declare class UpdateAffidavitDTO extends UpdateAffidavitDTO_base {
    id: string;
}
export {};
