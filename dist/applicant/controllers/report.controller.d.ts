import { ReqWithUser } from 'src/typings';
import { CreateReportDTO, UpdateReportDTO } from '../dto/report.dto';
import { ReportService } from '../services/report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    findAll(): Promise<import("../schema/report.schema").Report[]>;
    findOne(id: string): Promise<import("../schema/report.schema").Report>;
    findByApplicant(id: string): Promise<import("../schema/report.schema").ReportDocument[]>;
    delete(id: string): Promise<import("../schema/report.schema").Report>;
    create(data: CreateReportDTO, req: ReqWithUser): Promise<import("../schema/report.schema").Report>;
    update(data: UpdateReportDTO): Promise<import("../schema/report.schema").Report>;
    seed(): Promise<import("../schema/report.schema").ReportDocument[]>;
}
