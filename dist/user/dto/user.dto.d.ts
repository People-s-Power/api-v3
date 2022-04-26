import { Document } from 'mongoose';
import { Applicant } from 'src/applicant/schema/applicant.shema';
import { IGeo } from 'src/interfaces';
export declare enum StaffRoleEnum {
    Admin = "Admin",
    Rep = "Rep",
    LegalWorld = "LegalWorld",
    Lawyer = "Lawyer",
    Draft = "Draft",
    Supervisor = "Supervisor",
    Campaigner = "Campaigner",
    User = "User"
}
export declare enum AccountTypeEnum {
    Campaigner = "Campaigner",
    Staff = "Staff",
    Applicant = "Applicant",
    Contact = "Contact"
}
export declare class IUser extends Document {
    _doc: any;
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
    admin: IUser;
    userId: IUser;
    applicants: Applicant[];
    reportCount: number;
    applicantCount: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
    country: string;
    state: string;
    city: string;
}
export declare class RegisterWithEmailDTO {
    image: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
    otherName?: string;
    phone?: string;
    country?: string;
    state?: string;
    city?: string;
    location: IGeo;
}
declare const RegisterWithGoogleDTO_base: import("@nestjs/common").Type<Partial<RegisterWithEmailDTO>>;
export declare class RegisterWithGoogleDTO extends RegisterWithGoogleDTO_base {
    googleId: string;
}
export declare class LoginWithEmailDTO {
    email: string;
    phone: string;
    password: string;
}
export declare class LoginWithGoogleDTO {
    email: string;
    googleId: string;
}
export declare class UpdateUserDTO {
    name?: string;
    id: string;
    accountType: AccountTypeEnum;
    image?: string;
    firstName?: string;
    lastName?: string;
    otherName?: string;
    phone?: string;
    address?: string;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    country?: string;
    state?: string;
    city?: string;
}
export declare class AssignUserAdminDTO {
    user_id: string;
    admin_id: string;
}
export declare class ChangeUserRoleDTO {
    user_id: string;
    role: string;
}
export declare class ChangeUserAccountTypeDTO {
    user_id: string;
    accountType: string;
}
export declare class ChangePasswordDTO {
    id: string;
    oldPassword: string;
    newPassword: string;
}
export {};
