import { Document, ObjectId } from 'mongoose';
export declare type RelativeDocument = Relative & Document & {
    _doc: any;
};
export declare class Relative {
    name: string;
    phone: string;
    email: string;
    applicant_id: ObjectId;
}
export declare const RelativeSchema: import("mongoose").Schema<Document<Relative, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
