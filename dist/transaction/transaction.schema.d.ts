import { Document } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { PaymentPurposeEnum } from './transaction.interface';
export declare type TransactionDocument = Transaction & Document & {
    _doc: any;
};
export declare class Transaction {
    message: string;
    reference: string;
    status: string;
    transaction: string;
    amount: number;
    user: User;
    transactionId: number;
    paid_at: Date;
    created_at: Date;
    channel: string;
    purpose: PaymentPurposeEnum;
    key: string;
}
export declare const TransactionSchema: import("mongoose").Schema<Document<Transaction, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
