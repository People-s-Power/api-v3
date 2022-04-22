import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Applicant } from 'src/applicant/schema/applicant.shema';
import { AccountTypeEnum, StaffRoleEnum } from '../dto/user.dto';
import { Document, Types } from 'mongoose';

export type UserDocument = User &
  Document & {
    _id: any;
    _doc: any;
  };

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      doc.id = doc._id;
      delete ret._id;
      delete doc._id;
      ret.name = ret.firstName + ' ' + ret.lastName;
      doc.name = doc.firstName + ' ' + doc.lastName;

      return ret;
    },
  },
})
export class User {
  @Prop()
  name: string;
  @Prop()
  googleId: string;
  @Prop()
  facebookId: string;
  @Prop({
    type: String,
    enum: AccountTypeEnum,
    default: AccountTypeEnum.Campaigner,
  })
  accountType: AccountTypeEnum;
  @Prop()
  image: string;
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
  @Prop()
  otherName: string;
  @Prop({ require: true, unique: true })
  email: string;
  @Prop({ require: true })
  password: string;
  @Prop()
  phone: string;
  @Prop()
  emailToken: string;
  @Prop()
  emailVerified: boolean;
  @Prop({ default: false })
  isActive: boolean;
  @Prop({
    type: String,
    enum: StaffRoleEnum,
    default: StaffRoleEnum.User,
  })
  role: StaffRoleEnum;
  @Prop()
  address: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  reps: User[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  suppervisor: User;
  @Prop({ type: Types.ObjectId, ref: 'Applicant' })
  applicants: Applicant[];
  @Prop()
  reportCount: number;
  @Prop()
  applicantCount: number;
  @Prop()
  bankName: string;
  @Prop()
  accountNumber: string;
  @Prop()
  accountName: string;
  @Prop()
  country: string;
  @Prop()
  state: string;
  @Prop()
  city: string;
  @Prop({ type: Date, default: Date.now })
  lastSeen: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
