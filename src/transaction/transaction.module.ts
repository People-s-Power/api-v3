import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Applicant,
  ApplicantSchema,
} from 'src/applicant/schema/applicant.shema';
import { Campaign, CampaignSchema } from 'src/campaign/schema/campaign.schema';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Applicant.name, schema: ApplicantSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
