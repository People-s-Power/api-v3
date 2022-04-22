import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLGuard } from 'src/auth/guards/graphql.guard';
import { ReqWithUser } from 'src/typings';
import { RepCommentService } from '../services/rep-comment.service';
import { ReportService } from '../services/report.service';

@Resolver()
export class ReportResolver {
  constructor(
    private readonly reportService: ReportService,
    private readonly commentService: RepCommentService,
  ) {}

  @Query()
  async getReports() {
    return this.reportService.findAll();
  }
  @Query()
  async getReport(@Args('_id') _id: string) {
    return this.reportService.findOne(_id);
  }
  @UseGuards(GQLGuard)
  @Query()
  async getMyReports(@Context('req') req: ReqWithUser) {
    return this.reportService.findByUser(req.user);
  }
  @Query()
  async getApplicantsReport(@Args('applicant_id') applicant_id: string) {
    return this.reportService.findByApplicant(applicant_id);
  }
  // @Mutation()
}
