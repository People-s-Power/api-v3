import * as Mongoose from 'mongoose';
import { Applicant } from './applicant.shema';
export declare type AffidavitDocument = Affidavit & Document & {
    _id: any;
    id: any;
    _doc: any;
};
export declare class Affidavit {
    name: string;
    address: string;
    title: string;
    religion: string;
    occupation: string;
    rel: string;
    gender: string;
    applicant: Applicant;
    applicant_id: Applicant;
}
export declare const AffidavitSchema: Mongoose.Schema<Mongoose.Document<Affidavit, any, any>, Mongoose.Model<any, any, any>, undefined, any>;
