import { Document, ObjectId } from 'mongoose';
export declare type ExhibitDocument = Exhibit & Document & {
    _doc: any;
};
export declare class Exhibit {
    name: string;
    image: string;
    applicant_id: ObjectId;
}
export declare const ExhibitSchema: import("mongoose").Schema<Document<Exhibit, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
