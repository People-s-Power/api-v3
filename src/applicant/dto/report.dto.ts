import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDTO {
  @ApiProperty()
  applicant_id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
}

export class UpdateReportDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
}

export class CreateRepCommentDTO {
  @ApiProperty()
  report: string;
  @ApiProperty()
  content: string;
}

export class UpdateRepCommentDTO {
  @ApiProperty()
  content: string;
  @ApiProperty()
  id: string;
}
