import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCampaignDTO {
  @ApiProperty()
  title: string;
  @ApiProperty({ description: 'this is must be uploaded' })
  image: string;
  @ApiProperty()
  aim: string;
  @ApiProperty()
  target: string;
  @ApiProperty()
  body: string;
}

export class UpdateCampaignDTO extends PartialType(CreateCampaignDTO) {
  @ApiProperty()
  id: string;
}
