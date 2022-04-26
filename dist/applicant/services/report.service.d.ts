import { FilterQuery, Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateReportDTO, UpdateReportDTO } from '../dto/report.dto';
import { Report, ReportDocument } from '../schema/report.schema';
import { RepCommentService } from './rep-comment.service';
export declare class ReportService {
    private readonly reportModel;
    private readonly commentService;
    constructor(reportModel: Model<ReportDocument>, commentService: RepCommentService);
    create(data: CreateReportDTO, user: UserDocument): Promise<Report>;
    findAll(): Promise<Report[]>;
    findByApplicant(applicant_id: any): Promise<ReportDocument[]>;
    findByUser(user_id: any): Promise<Report[]>;
    findOne(id: string): Promise<Report>;
    update(data: UpdateReportDTO): Promise<Report>;
    delete(id: string): Promise<Report>;
    deleteMany(query: FilterQuery<ReportDocument>): Promise<ReportDocument[]>;
    addComment(report_id: string, comment_id: any): Promise<Report>;
    removeComment(report_id: string, comment_id: any): Promise<Report>;
    seedReport(): Promise<ReportDocument[]>;
}
