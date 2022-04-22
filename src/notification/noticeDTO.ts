import { PartialType } from '@nestjs/swagger';
import { Notice } from './notification.schema';

export class CreateNoticeDTO extends PartialType(Notice) {
  message: string;
  event: string;
  user: any;
}
