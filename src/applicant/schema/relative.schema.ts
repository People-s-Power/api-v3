import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type RelativeDocument = Relative & Document & { _doc: any };
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
export class Relative {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: false })
  email: string;
  @Prop({ type: Types.ObjectId, ref: 'Applicant' })
  applicant_id: ObjectId;
}

export const RelativeSchema = SchemaFactory.createForClass(Relative);
