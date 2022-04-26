import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Applicant } from 'src/applicant/schema/applicant.shema';
import { IGeo } from 'src/interfaces';

export enum StaffRoleEnum {
  Admin = 'Admin',
  Rep = 'Rep',
  LegalWorld = 'LegalWorld',
  Lawyer = 'Lawyer',
  Draft = 'Draft',
  Supervisor = 'Supervisor',
  Campaigner = 'Campaigner',
  User = 'User',
}

export enum AccountTypeEnum {
  Campaigner = 'Campaigner',
  Staff = 'Staff',
  Applicant = 'Applicant',
  Contact = 'Contact',
}

export class IUser extends Document {
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

export class RegisterWithEmailDTO {
  @ApiProperty()
  image: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ nullable: true })
  otherName?: string;
  @ApiProperty({ nullable: true })
  phone?: string;
  @ApiProperty({ nullable: true })
  country?: string;
  @ApiProperty({ nullable: true })
  state?: string;
  @ApiProperty({ nullable: true })
  city?: string;
  @ApiProperty()
  location: IGeo;
}

export class RegisterWithGoogleDTO extends PartialType(RegisterWithEmailDTO) {
  @ApiProperty()
  googleId: string;
}

export class LoginWithEmailDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
}
export class LoginWithGoogleDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  googleId: string;
}

export class UpdateUserDTO {
  @ApiProperty({ nullable: true })
  name?: string;
  @ApiProperty()
  id: string;
  accountType: AccountTypeEnum;
  @ApiProperty({ nullable: true })
  image?: string;
  firstName?: string;
  @ApiProperty({ nullable: true })
  lastName?: string;
  @ApiProperty({ nullable: true })
  otherName?: string;
  @ApiProperty({ nullable: true })
  phone?: string;
  @ApiProperty({ nullable: true })
  address?: string;
  @ApiProperty({ nullable: true })
  @ApiProperty({ nullable: true })
  bankName?: string;
  @ApiProperty({ nullable: true })
  accountNumber?: string;
  @ApiProperty({ nullable: true })
  accountName?: string;
  @ApiProperty({ nullable: true })
  country?: string;
  @ApiProperty({ nullable: true })
  state?: string;
  @ApiProperty({ nullable: true })
  city?: string;
}

export class AssignUserAdminDTO {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  admin_id: string;
}

export class ChangeUserRoleDTO {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  role: string;
}

export class ChangeUserAccountTypeDTO {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  accountType: string;
}

export class ChangePasswordDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}
