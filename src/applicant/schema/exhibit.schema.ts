import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type ExhibitDocument = Exhibit &
  Document & {
    _doc: any;
  };

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
export class Exhibit {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  image: string;
  @Prop({ type: Types.ObjectId, ref: 'Applicant', required: true })
  applicant_id: ObjectId;
}

export const ExhibitSchema = SchemaFactory.createForClass(Exhibit);
