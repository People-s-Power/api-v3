import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { CampaignStatusEnum, IEndorsement } from '../dto/campaign.interface';

export type CampaignDocument = Campaign &
  Document & {
    _doc: any;
  };
export type ViewDocument = View & Document;

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
export class Campaign {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  aim: string;
  @Prop({ required: true })
  target: string;
  @Prop({ required: true })
  body: string;
  @Prop({ type: String, slug: 'title' })
  slug: string;
  @Prop()
  excerpt: string;
  @Prop({
    type: String,
    enum: CampaignStatusEnum,
    default: CampaignStatusEnum.Active,
  })
  status: string;
  @Prop({ type: Boolean, default: false })
  featured: boolean;
  @Prop({ type: Types.ObjectId, ref: 'User', autopopulate: true })
  author: Record<string, User>;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  addedFrom: string;
  @Prop({ required: true })
  category: string;
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Endorsement', autopopulate: true }],
  })
  endorsements: IEndorsement[];
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User', autopopulate: true }],
  })
  endorserIds: string[];
  @Prop({ type: Number, defalut: 0 })
  numberOfPaidEndorsementCount: number;
  @Prop({ type: Number, defalut: 0 })
  numberOfPaidViewsCount: number;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User', autopopulate: true }] })
  likes: UserDocument[];
  @Prop()
  likeCount: number;
  @Prop({ type: Boolean, default: false })
  promoted: boolean;
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'View', autopopulate: true }],
  })
  views: any[];
}

@Schema()
export class View {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: UserDocument;
}

export const ViewSchema = SchemaFactory.createForClass(View);
export const CampaignSchema = SchemaFactory.createForClass(Campaign);
