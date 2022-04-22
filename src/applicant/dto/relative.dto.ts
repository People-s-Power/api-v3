import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRelativeDTO {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  phone: string;

  @ApiProperty()
  applicant_id: string;
}

export class UpdateRelativeDTO extends PartialType(CreateRelativeDTO) {
  @ApiProperty()
  id: string;
}
