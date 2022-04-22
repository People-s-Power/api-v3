import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './controllers/campaign.controller';
import { EndorsementController } from './controllers/endorsement.controller';
import { CampaignGateway } from './gateway/campaign.gateway';
import { CampaignResolver } from './resolvers/campaign.resolver';
import { EndorsementResolver } from './resolvers/endorsement.resolver';
import {
  Campaign,
  CampaignSchema,
  View,
  ViewSchema,
} from './schema/campaign.schema';
import { Endorsement, EndorsementSchema } from './schema/endorsement.schema';
import { CampaignService } from './services/campaign.service';
import { EndorsementService } from './services/endorsement.service';

import mongooseSlug = require('mongoose-slug-generator');
import { User, UserSchema } from 'src/user/entity/user.schema';
import { Notice, NoticeSchema } from 'src/notification/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      ,
      { name: Endorsement.name, schema: EndorsementSchema },
      { name: User.name, schema: UserSchema },
      { name: Notice.name, schema: NoticeSchema },
      { name: View.name, schema: ViewSchema },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Campaign.name,
        useFactory: () => {
          const schema = CampaignSchema;
          schema.plugin(mongooseSlug);
          return schema;
        },
      },
    ]),
  ],
  providers: [
    CampaignResolver,
    CampaignService,
    EndorsementService,
    EndorsementResolver,
    CampaignGateway,
  ],
  controllers: [CampaignController, EndorsementController],
})
export class CampaignModule {}
