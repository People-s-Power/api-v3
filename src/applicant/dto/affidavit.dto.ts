import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Applicant } from '../schema/applicant.shema';

export class CreateAffidavitDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  religion: string;
  @ApiProperty()
  occupation: string;
  @ApiProperty()
  rel: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  applicant: string | Applicant;
}

export class UpdateAffidavitDTO extends PartialType(CreateAffidavitDTO) {
  @ApiProperty()
  id: string;
}
