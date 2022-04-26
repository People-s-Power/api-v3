import { Model } from 'mongoose';
import { CampaignDocument } from 'src/campaign/schema/campaign.schema';
import { TransactionPaymentResponse } from './transaction.interface';
import { TransactionDocument } from './transaction.schema';
export declare class TransactionService {
    private readonly transactionModel;
    private readonly campaignModel;
    constructor(transactionModel: Model<TransactionDocument>, campaignModel: Model<CampaignDocument>);
    webhook(e: TransactionPaymentResponse): Promise<boolean>;
    verifyPayment(reference: string): Promise<TransactionDocument>;
}
