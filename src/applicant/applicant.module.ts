import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entity/user.schema';
import { UserService } from 'src/user/user.service';
import { AffidavitController } from './controllers/affidavit.controller';
import { ApplicantController } from './controllers/applicant.controller';
import { AffidavitResolver } from './resolvers/affidavit.resolver';
import { ApplicantResolver } from './resolvers/applicant.resolver';
import { Affidavit, AffidavitSchema } from './schema/affidavit.schema';
import { Applicant, ApplicantSchema } from './schema/applicant.shema';
import { AffidavitService } from './services/affidavit.service';
import { ApplicantService } from './services/applicant.service';
import { ExhibitController } from './controllers/exhibit.controller';
import { ExhibitService } from './services/exhibit.service';
import { ExhibitResolver } from './resolvers/exhibit.resolver';
import { Exhibit, ExhibitSchema } from './schema/exhibit.schema';
import { Relative, RelativeSchema } from './schema/relative.schema';
import { RelativeResolver } from './resolvers/relative.resolver';
import { RelativeService } from './services/relative.service';
import { RelativeController } from './controllers/relative.controller';
import { ReportResolver } from './resolvers/report.resolver';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import {
  RepComment,
  RepCommentSchema,
  Report,
  ReportSchema,
} from './schema/report.schema';
import { RepCommentService } from './services/rep-comment.service';
import { RepCommentController } from './controllers/rep-comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applicant.name, schema: ApplicantSchema },
      { name: Affidavit.name, schema: AffidavitSchema },
      { name: Exhibit.name, schema: ExhibitSchema },
      { name: Relative.name, schema: RelativeSchema },
      { name: Report.name, schema: ReportSchema },
      { name: RepComment.name, schema: RepCommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CacheModule.register(),
  ],
  providers: [
    ApplicantResolver,
    ApplicantService,
    AffidavitService,
    AffidavitResolver,
    UserService,
    ExhibitService,
    ExhibitResolver,
    RelativeResolver,
    RelativeService,
    ReportResolver,
    ReportService,
    RepCommentService,
  ],
  controllers: [
    ApplicantController,
    AffidavitController,
    ExhibitController,
    RelativeController,
    ReportController,
    RepCommentController,
  ],
})
export class ApplicantModule {}
