import { User } from 'src/user/entity/user.schema';
import { Document } from 'mongoose';

export enum CampaignStatusEnum {
  Active = 'Active',
  Pending = 'Pending',
  Finished = 'Finished',
  Draft = 'Draft',
  Promoted = 'Promoted',
}
export enum CampaignSocketEnum {
  Created = 'created-campaign',
  Endorsed = 'endorsed-campaign',
  Liked = 'liked-campaign',
  Shared = 'shared-campaign',
  Promoted = 'promoted-campaign',
  Deleted = 'deleted-campaign',
  Get = 'get-campaigns',
  Send = 'send-endorsements'
}

export interface ISendEndorsement {
  campaignId: string,
  endorserId: string,
  endorserName: string
}

export interface ICampaign extends Document {
  _doc: any;
  title: string;
  video: string;
  image: string;
  aim: string;
  target: string;
  body: string;
  slug: string;
  excerpt: string;
  status: CampaignStatusEnum;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  addedFrom: string;
  category: string;
  endorsements: IEndorsement[];
  endorsementCount: number;
  likes: string[];
  likeCount: number;
}

export interface IEndorsement extends Document {
  _doc: any;
  author: User;
  campaign: ICampaign | string;
  likes: string[];
  body: string;
  createdAt: Date;
  updatedAt: Date;
  likeCount: number;
}
export interface ICampaignNotice {
  action: string;
  author: User;
  data: ICampaign;
  createdAt: Date;
  read: boolean;
}
