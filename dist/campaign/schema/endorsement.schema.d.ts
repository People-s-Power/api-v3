import { Document } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { Campaign } from './campaign.schema';
export declare type EndorsementDocument = Endorsement & Document;
export declare class Endorsement {
    author: Record<string, User>;
    campaign: Record<string, Campaign>;
    likes: User[] | string[];
    body: string;
    createdAt: Date;
    updatedAt: Date;
    likeCount: number;
}
export declare const EndorsementSchema: import("mongoose").Schema<Document<Endorsement, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
