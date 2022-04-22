import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateApplicantDTO {
  @ApiProperty({})
  name: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  state_origin: string;
  @ApiProperty()
  state_residence: string;
  @ApiProperty()
  lga: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  breach_type: string;
  @ApiProperty({ default: false })
  inPrison: boolean;
  @ApiProperty({ default: false })
  daysPlus: boolean;
  @ApiProperty({ default: false })
  monthsPlus: boolean;
  @ApiProperty()
  arrested_on: Date;
  @ApiProperty()
  arrested_at: string;
  @ApiProperty()
  offence_suspected: string;
  @ApiProperty({ nullable: true, default: 0 })
  case_mates: number;
  @ApiProperty({ nullable: true })
  itinerary: string;
  @ApiProperty()
  station: string;
  @ApiProperty({ nullable: true })
  station2: string;
  @ApiProperty()
  station_duration: number;
  @ApiProperty({ nullable: true, default: 0 })
  station2_duration: number;
  @ApiProperty()
  state_arrest: string;
  @ApiProperty({ nullable: true })
  beaten: string;
  @ApiProperty({ nullable: true })
  injured: string;
  @ApiProperty({ nullable: true })
  bail_amount: number;
  @ApiProperty({ nullable: true })
  detention_cost_explained: string;
  @ApiProperty({ nullable: true })
  first_accused: string;
  @ApiProperty({ nullable: true })
  offence_charged: string;
  @ApiProperty({ nullable: true })
  arraigned_on: Date;
  @ApiProperty({ nullable: true })
  state_arraigned: string;
  @ApiProperty({ nullable: true })
  adjournment_date: Date;
  @ApiProperty({ nullable: true })
  dpp: string;
  @ApiProperty({ nullable: true })
  division: string;
  @ApiProperty()
  contact_form: string;
}

export class UpdateApplicantDTO extends PartialType(CreateApplicantDTO) {
  @ApiProperty()
  id: string;
}

export class AssignApplicantDTO {
  @ApiProperty()
  applicant_id: string;
  @ApiProperty()
  user_id: string;
}

export class ApplicantAddAffidavit {
  @ApiProperty()
  applicant_id: string;
  @ApiProperty()
  affidavit: string;
}

export class UploadContactFormDTO {
  @ApiProperty()
  applicant_id: string;
  @ApiProperty()
  contact_form: string;
}
