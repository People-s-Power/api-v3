import { ReqWithUser } from 'src/typings';
import { RepCommentService } from '../services/rep-comment.service';
import { ReportService } from '../services/report.service';
export declare class ReportResolver {
    private readonly reportService;
    private readonly commentService;
    constructor(reportService: ReportService, commentService: RepCommentService);
    getReports(): Promise<import("../schema/report.schema").Report[]>;
    getReport(_id: string): Promise<import("../schema/report.schema").Report>;
    getMyReports(req: ReqWithUser): Promise<import("../schema/report.schema").Report[]>;
    getApplicantsReport(applicant_id: string): Promise<import("../schema/report.schema").ReportDocument[]>;
}
