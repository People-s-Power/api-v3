import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entity/user.schema';

export type NoticeDocument = Notice &
  Document & {
    _doc: any;
  };

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      doc.id = doc._id;
      delete ret._id;
      delete doc._id;

      return ret;
    },
  },
})
export class Notice {
  @Prop()
  message: string;
  @Prop()
  event: string;
  @Prop()
  db_model: string;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
