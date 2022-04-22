import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { Campaign } from './campaign.schema';

export type EndorsementDocument = Endorsement & Document;

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
export class Endorsement {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Record<string, User>;
  @Prop({ type: Types.ObjectId, ref: 'Campaign' })
  campaign: Record<string, Campaign>;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  likes: User[] | string[];
  @Prop({ required: true })
  body: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  likeCount: number;
}

export const EndorsementSchema = SchemaFactory.createForClass(Endorsement);
