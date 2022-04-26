import { Notice } from './notification.schema';
declare const CreateNoticeDTO_base: import("@nestjs/common").Type<Partial<Notice>>;
export declare class CreateNoticeDTO extends CreateNoticeDTO_base {
    message: string;
    event: string;
    user: any;
}
export {};
