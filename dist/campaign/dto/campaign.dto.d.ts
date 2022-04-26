export declare class CreateCampaignDTO {
    title: string;
    image: string;
    aim: string;
    target: string;
    body: string;
}
declare const UpdateCampaignDTO_base: import("@nestjs/common").Type<Partial<CreateCampaignDTO>>;
export declare class UpdateCampaignDTO extends UpdateCampaignDTO_base {
    id: string;
}
export {};
