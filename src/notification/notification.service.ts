import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
  ) {}

  async findAll(model?: string) {
    try {
      if (model) {
        const notifications = await this.noticeModel.find({
          db_model: model,
        });
        return notifications;
      } else {
        const notifications = await this.noticeModel.find({});
        return notifications;
      }
    } catch (error) {
      throw error;
    }
  }
}
