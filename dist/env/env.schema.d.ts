import { Document } from 'mongoose';
export declare type EnvDocument = Env & Document & {
    id: any;
    _doc: any;
};
export declare class Env {
    name: string;
    value: string;
    isPrivate: boolean;
}
export declare const EnvSchema: import("mongoose").Schema<Document<Env, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
