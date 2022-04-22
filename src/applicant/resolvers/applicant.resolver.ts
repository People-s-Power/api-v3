import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicantService } from '../services/applicant.service';
import { Applicant } from '../schema/applicant.shema';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GQLGuard } from 'src/auth/guards/graphql.guard';
import { ReqWithUser } from 'src/typings';
import { UploadContactFormDTO } from '../dto/applicant.dto';
import { UserDocument } from 'src/user/entity/user.schema';

@Resolver('Applicant')
export class ApplicantResolver {
  constructor(private readonly applicantService: ApplicantService) {}

  @Query()
  getApplicants(@CurrentUser() user: UserDocument) {
    return this.applicantService.findAll(user);
  }
  @Query()
  async getApplicant(@Args('id') id: string) {
    return await this.applicantService.findOne(id);
  }
  @Query()
  async getUserApplicants(@Args('id') id: string) {
    return await this.applicantService.findByUser(id);
  }
  @Query()
  async showDraft(@Args('id') id: string) {
    return await this.applicantService.getDraft(id);
  }
  @UseGuards(GQLGuard)
  @Mutation()
  async createApplicant(
    @Args('input') input: Applicant,
    @Context('req') req: ReqWithUser,
  ) {
    return await this.applicantService.create(input, req.user);
  }
  @Mutation()
  async deleteApplicant(@Args('id') id: string) {
    return await this.applicantService.delete(id);
  }
  @Mutation()
  async uploadForm(@Args('input') input: UploadContactFormDTO) {
    return await this.applicantService.uploadContactForm(input);
  }
}
