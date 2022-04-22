import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { connectOldDB } from 'src/utils/connectDb';
import { CreateRepCommentDTO, UpdateRepCommentDTO } from '../dto/report.dto';
import { RepComment, RepCommentDocument } from '../schema/report.schema';
import { ReportService } from './report.service';

@Injectable()
export class RepCommentService {
  constructor(
    @InjectModel(RepComment.name)
    private readonly repCommentModel: Model<RepCommentDocument>,
    @Inject(forwardRef(() => ReportService))
    private readonly reportService: ReportService,
  ) {}
  // @Inject('ReportService')

  async create(
    data: CreateRepCommentDTO,
    user: UserDocument,
  ): Promise<RepComment> {
    try {
      const comment = await this.repCommentModel.create({
        ...data,
        author: user.id as any,
      });
      await this.reportService.addComment(data.report, comment.id);
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<RepComment> {
    try {
      const comment = await this.repCommentModel.findById(id);
      if (!comment) throw new NotFoundException('Record not found');
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<RepComment> {
    try {
      const comment = await this.repCommentModel.findById(id);
      if (!comment) throw new NotFoundException('Record not found');
      await this.reportService.removeComment(
        comment.report as any,
        comment.id as string,
      );
      comment.remove();
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async update(data: UpdateRepCommentDTO): Promise<RepComment> {
    try {
      const comment = await this.repCommentModel.findByIdAndUpdate(
        data.id,
        data,
        { new: true },
      );
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<RepComment[]> {
    try {
      return await this.repCommentModel.find();
    } catch (error) {
      throw error;
    }
  }
  async findByReport(report_id: any): Promise<RepCommentDocument[]> {
    try {
      return await this.repCommentModel.find({ report: report_id });
    } catch (error) {
      throw error;
    }
  }
  async seedRepComment(): Promise<RepCommentDocument[]> {
    let fakeRepComments = (await connectOldDB(
      'repcomments',
    )) as RepCommentDocument[];
    fakeRepComments = [...fakeRepComments];

    const newRepComment = fakeRepComments
      ?.filter((comment) => comment?.report)
      ?.map((comment) => ({
        ...comment,
        content: comment?.content || 'no content',
      }));
    try {
      await this.repCommentModel.deleteMany();
      const reports = await this.repCommentModel.insertMany(newRepComment);
      return reports;
    } catch (error) {
      throw error;
    }
  }
}
