import { Applicant } from 'src/applicant/schema/applicant.shema';
import { AccountTypeEnum, StaffRoleEnum } from '../dto/user.dto';
import { Document } from 'mongoose';
export declare type UserDocument = User & Document & {
    _id: any;
    _doc: any;
};
export declare class User {
    name: string;
    googleId: string;
    facebookId: string;
    accountType: AccountTypeEnum;
    image: string;
    firstName: string;
    lastName: string;
    otherName: string;
    email: string;
    password: string;
    phone: string;
    emailToken: string;
    emailVerified: boolean;
    isActive: boolean;
    role: StaffRoleEnum;
    address: string;
    reps: User[];
    suppervisor: User;
    applicants: Applicant[];
    reportCount: number;
    applicantCount: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
    country: string;
    state: string;
    city: string;
    lastSeen: Date;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
