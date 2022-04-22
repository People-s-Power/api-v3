import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Affidavit } from 'src/applicant/schema/affidavit.schema';
import { AffidavitService } from '../services/affidavit.service';

@Resolver()
export class AffidavitResolver {
  constructor(private readonly affidavitService: AffidavitService) {}

  @Query()
  async getAffidavits() {
    return await this.affidavitService.findAll();
  }
  @Query()
  async getAffidavit(@Args('id') id: string) {
    return await this.affidavitService.findOne(id);
  }
  @Query()
  async getAffidavitByApplicant(@Args('applicant_id') applicant_id: string) {
    return await this.affidavitService.findByApplicant(applicant_id);
  }
  @Mutation()
  async createAffidavit(@Args('input') input: Affidavit) {
    return await this.affidavitService.create(input);
  }
  @Mutation()
  async deleteAffidavit(@Args('id') id: string) {
    return await this.affidavitService.deleteAffidavit(id);
  }
  @Mutation()
  async deleteManyAffidavit() {
    return await this.affidavitService.deleteAllAffidavitWithoutApplicants();
  }
}
