export declare class CreateExhibitDTO {
    name: string;
    image: string;
    applicant_id: string;
}
declare const UpdateExhibitDTO_base: import("@nestjs/common").Type<Partial<CreateExhibitDTO>>;
export declare class UpdateExhibitDTO extends UpdateExhibitDTO_base {
    id: string;
}
export {};
