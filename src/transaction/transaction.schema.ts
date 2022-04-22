import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { PaymentPurposeEnum } from './transaction.interface';

export type TransactionDocument = Transaction &
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
export class Transaction {
  @Prop()
  message: string;
  @Prop()
  reference: string;
  @Prop()
  status: string;
  @Prop()
  transaction: string;
  @Prop()
  amount: number;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
  @Prop()
  transactionId: number;
  @Prop()
  paid_at: Date;
  @Prop()
  created_at: Date;
  @Prop()
  channel: string;
  @Prop({ type: String, enum: PaymentPurposeEnum })
  purpose: PaymentPurposeEnum;
  @Prop()
  key: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
