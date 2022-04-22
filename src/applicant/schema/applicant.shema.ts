import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { types } from 'util';
import { Affidavit } from './affidavit.schema';
import { Exhibit } from './exhibit.schema';
import { Relative } from './relative.schema';

export type ApplicantDocument = Document &
  Applicant & {
    _id: any;
    _doc: any;
    id: any;
  };

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Applicant {
  // Bio Data
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  image: string;
  @Prop()
  gender: string;
  @Prop()
  state_origin: string;
  @Prop()
  state_residence: string;
  @Prop()
  lga: string;
  @Prop()
  address: string;
  @Prop()
  breach_type: string;
  // Detention Information
  @Prop()
  inPrison: boolean;
  @Prop()
  daysPlus: boolean;
  @Prop()
  monthsPlus: boolean;
  @Prop()
  arrested_on: Date;
  @Prop()
  arrested_at: string;

  @Prop()
  offence_suspected: string;
  @Prop()
  case_mates: number;
  @Prop()
  itinerary: string;
  @Prop()
  station: string;
  @Prop()
  station2: string;
  @Prop()
  station_duration: number;
  @Prop()
  station2_duration: number;
  @Prop()
  state_arrest: string;
  @Prop()
  beaten: string;
  @Prop()
  injured: string;
  @Prop()
  bail_amount: number;
  @Prop()
  detention_cost_explained: string;
  @Prop()
  first_accused: string;

  // Court Information
  @Prop({ required: true })
  caseType: string;
  @Prop()
  offence_charged: string;
  @Prop()
  arraigned_on: Date;
  @Prop()
  arraigned_at: string;
  @Prop()
  state_arraigned: string;
  @Prop()
  adjournment_date: Date;
  @Prop()
  dpp: string;
  @Prop()
  charge_no: string;
  @Prop()
  division: string;
  @Prop()
  amount_paid: string;
  @Prop()
  contact_form: string;
  @Prop({ type: Types.ObjectId, ref: 'Affidavit' })
  affidavit: Affidavit;
  @Prop({ type: Types.ObjectId, ref: 'Exhibit' })
  exhibits: Exhibit[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Relative' }] })
  relatives: Relative[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  rep: Record<string, User>;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  lawyer: Record<string, User>;
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
