import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Applicant } from './applicant.shema';

export type AffidavitDocument = Affidavit &
  Document & {
    _id: any;
    id: any;
    _doc: any;
  };

@Schema({
  timestamps: true,

  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete doc.id;
      // return ret ;
    },
  },
})
export class Affidavit {
  // @Prop({ type: Mongoose.Types.ObjectId })
  // id: Mongoose.ObjectId;
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  title: string;
  @Prop()
  religion: string;
  @Prop()
  occupation: string;
  @Prop()
  rel: string;
  @Prop()
  gender: string;
  @Prop({ type: Mongoose.Types.ObjectId, ref: 'Applicant' })
  applicant: Applicant;
  @Prop({ type: Mongoose.Types.ObjectId, ref: 'Applicant' })
  applicant_id: Applicant;
}

export const AffidavitSchema = SchemaFactory.createForClass(Affidavit);
