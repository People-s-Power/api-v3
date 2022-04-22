import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateExhibitDTO {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  image: string;
  @ApiProperty({ required: true })
  applicant_id: string;
}

export class UpdateExhibitDTO extends PartialType(CreateExhibitDTO) {
  @ApiProperty()
  id: string;
}
