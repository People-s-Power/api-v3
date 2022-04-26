import { Document } from 'mongoose';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { IEndorsement } from '../dto/campaign.interface';
export declare type CampaignDocument = Campaign & Document & {
    _doc: any;
};
export declare type ViewDocument = View & Document;
export declare class Campaign {
    title: string;
    image: string;
    aim: string;
    target: string;
    body: string;
    slug: string;
    excerpt: string;
    status: string;
    featured: boolean;
    author: Record<string, User>;
    createdAt: Date;
    updatedAt: Date;
    addedFrom: string;
    category: string;
    endorsements: IEndorsement[];
    endorsementCount: number;
    likes: UserDocument[];
    likeCount: number;
    promoted: boolean;
    views: any[];
}
export declare class View {
    user: UserDocument;
}
export declare const ViewSchema: import("mongoose").Schema<Document<View, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
export declare const CampaignSchema: import("mongoose").Schema<Document<Campaign, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
