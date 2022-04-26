import { Document } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
export declare type NoticeDocument = Notice & Document & {
    _doc: any;
};
export declare class Notice {
    message: string;
    event: string;
    db_model: string;
    user: User;
}
export declare const NoticeSchema: import("mongoose").Schema<Document<Notice, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
