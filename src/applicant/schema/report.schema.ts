import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { Applicant } from './applicant.shema';

export type ReportDocument = Report & Document;
export type RepCommentDocument = RepComment & Document;

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Report {
  @Prop({ type: Types.ObjectId, ref: 'Applicant' })
  applicant_id: Record<string, Applicant>;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Record<string, User>;
  @Prop()
  title: string;
  @Prop({ default: false })
  status: boolean;
  @Prop({ required: true })
  content: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'RepComment' }] })
  comments: RepComment[];
}

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class RepComment {
  @Prop({ type: Types.ObjectId, ref: 'Report' })
  report: Report;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Record<string, User>;
  @Prop({ default: false })
  status: boolean;
  @Prop({ required: true })
  content: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
export const RepCommentSchema = SchemaFactory.createForClass(RepComment);
