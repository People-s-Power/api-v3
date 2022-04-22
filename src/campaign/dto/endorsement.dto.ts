import { ApiProperty } from '@nestjs/swagger';

export class CreateEndorsementDTO {
  @ApiProperty()
  campaign: string;
  @ApiProperty()
  body: string;
}

export class UpdateEndorsementDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  body: string;
}

export class LikeEndorsementDTO {
  @ApiProperty()
  id: string;
}
