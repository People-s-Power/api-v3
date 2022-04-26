import { Response } from 'express';
import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    home(): string;
    verify(reference: string): Promise<import("./transaction.schema").TransactionDocument>;
    webhook(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
