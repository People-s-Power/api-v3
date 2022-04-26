import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly noticeService;
    constructor(noticeService: NotificationService);
    findAll(): Promise<import("./notification.schema").NoticeDocument[]>;
}
