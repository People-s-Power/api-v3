import { Model } from 'mongoose';
import { NoticeDocument } from './notification.schema';
export declare class NotificationService {
    private readonly noticeModel;
    constructor(noticeModel: Model<NoticeDocument>);
    findAll(model?: string): Promise<NoticeDocument[]>;
}
