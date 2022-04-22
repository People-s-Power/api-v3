import { Args, Query, Resolver } from '@nestjs/graphql';
import { RelativeService } from '../services/relative.service';

@Resolver()
export class RelativeResolver {
  constructor(private readonly relativeService: RelativeService) {}
  @Query()
  getRelativesByApplicant(@Args('applicant_id') applicant_id: string) {
    return this.relativeService.findByApplicantId(applicant_id);
  }
}
