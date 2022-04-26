export declare class CreateRelativeDTO {
    name: string;
    phone: string;
    applicant_id: string;
}
declare const UpdateRelativeDTO_base: import("@nestjs/common").Type<Partial<CreateRelativeDTO>>;
export declare class UpdateRelativeDTO extends UpdateRelativeDTO_base {
    id: string;
}
export {};
