export declare class CreateApplicantDTO {
    name: string;
    gender: string;
    state_origin: string;
    state_residence: string;
    lga: string;
    address: string;
    breach_type: string;
    inPrison: boolean;
    daysPlus: boolean;
    monthsPlus: boolean;
    arrested_on: Date;
    arrested_at: string;
    offence_suspected: string;
    case_mates: number;
    itinerary: string;
    station: string;
    station2: string;
    station_duration: number;
    station2_duration: number;
    state_arrest: string;
    beaten: string;
    injured: string;
    bail_amount: number;
    detention_cost_explained: string;
    first_accused: string;
    offence_charged: string;
    arraigned_on: Date;
    state_arraigned: string;
    adjournment_date: Date;
    dpp: string;
    division: string;
    contact_form: string;
}
declare const UpdateApplicantDTO_base: import("@nestjs/common").Type<Partial<CreateApplicantDTO>>;
export declare class UpdateApplicantDTO extends UpdateApplicantDTO_base {
    id: string;
}
export declare class AssignApplicantDTO {
    applicant_id: string;
    user_id: string;
}
export declare class ApplicantAddAffidavit {
    applicant_id: string;
    affidavit: string;
}
export declare class UploadContactFormDTO {
    applicant_id: string;
    contact_form: string;
}
export {};
