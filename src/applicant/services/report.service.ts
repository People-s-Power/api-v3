import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { connectOldDB } from 'src/utils/connectDb';
import { CreateReportDTO, UpdateReportDTO } from '../dto/report.dto';
import { Report, ReportDocument } from '../schema/report.schema';
import { RepCommentService } from './rep-comment.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>,
    private readonly commentService: RepCommentService,
  ) {}

  // @Inject('RepCommentService')

  async create(data: CreateReportDTO, user: UserDocument): Promise<Report> {
    try {
      let report = await this.reportModel.create({
        ...data,
        author: user.id as any,
      });
      report = await this.reportModel
        .findById(report.id)
        .populate('author', 'id firstName lastName image');
      return report;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Report[]> {
    try {
      const reports = await this.reportModel
        .find()
        .populate('applicant_id', 'id name')
        .populate('comments');

      return reports;
    } catch (error) {
      throw error;
    }
  }
  async findByApplicant(applicant_id: any): Promise<ReportDocument[]> {
    try {
      const reports = await this.reportModel
        .find({ applicant_id })
        .sort({ createdAt: -1 })
        .populate('applicant_id', 'id name')
        .populate('comments')
        .populate('author', 'id firstName lastName image');
      return reports;
    } catch (error) {
      throw error;
    }
  }
  async findByUser(user_id: any): Promise<Report[]> {
    try {
      const reports = await this.reportModel
        .find({ author: user_id })
        .populate('applicant_id', 'id name')
        .populate('author', 'id firstName lastName image');
      return reports;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Report> {
    try {
      const report = await this.reportModel
        .findById(id)
        .populate('author', 'id firstName lastName image role')
        .populate('comments');
      if (!report) throw new NotFoundException();
      return report;
    } catch (error) {
      throw error;
    }
  }

  async update(data: UpdateReportDTO): Promise<Report> {
    try {
      const report = await this.reportModel.findByIdAndUpdate(data.id, data, {
        new: true,
      });
      return report;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<Report> {
    try {
      const report = await this.reportModel.findById(id);
      if (!report) throw new NotFoundException();

      const comments = await this.commentService.findByReport(id);
      if (comments.length) {
        comments.forEach(
          async (comment) => await this.commentService.delete(comment.id),
        );
      }
      // report.remove();
      return report;
    } catch (error) {
      throw error;
    }
  }
  async deleteMany(
    query: FilterQuery<ReportDocument>,
  ): Promise<ReportDocument[]> {
    try {
      const res = await this.reportModel.find(query);

      return res;
    } catch (error) {
      throw error;
    }
  }
  async addComment(report_id: string, comment_id: any): Promise<Report> {
    try {
      const report = await this.reportModel.findByIdAndUpdate(
        report_id,
        { $addToSet: { comments: comment_id } },
        { new: true },
      );
      return report;
    } catch (error) {
      throw error;
    }
  }
  async removeComment(report_id: string, comment_id: any): Promise<Report> {
    try {
      const report = await this.reportModel.findByIdAndUpdate(
        report_id,
        { $pull: { comments: comment_id } },
        { new: true },
      );
      return report;
    } catch (error) {
      throw error;
    }
  }

  async seedReport(): Promise<ReportDocument[]> {
    let fakeReports = (await connectOldDB('reports')) as ReportDocument[];
    fakeReports = [...fakeReports];
    const newReports = fakeReports?.map((report) => ({
      ...report,
      applicant_id: report?.applicant_id,
    }));
    try {
      await this.reportModel.deleteMany();
      const reports = await this.reportModel.insertMany(newReports);
      return reports;
    } catch (error) {
      throw error;
    }
  }
}
