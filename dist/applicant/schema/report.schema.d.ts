import { Document } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { Applicant } from './applicant.shema';
export declare type ReportDocument = Report & Document;
export declare type RepCommentDocument = RepComment & Document;
export declare class Report {
    applicant_id: Record<string, Applicant>;
    author: Record<string, User>;
    title: string;
    status: boolean;
    content: string;
    comments: RepComment[];
}
export declare class RepComment {
    report: Report;
    author: Record<string, User>;
    status: boolean;
    content: string;
}
export declare const ReportSchema: import("mongoose").Schema<Document<Report, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
export declare const RepCommentSchema: import("mongoose").Schema<Document<RepComment, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
