import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateRepCommentDTO, UpdateRepCommentDTO } from '../dto/report.dto';
import { RepComment, RepCommentDocument } from '../schema/report.schema';
import { ReportService } from './report.service';
export declare class RepCommentService {
    private readonly repCommentModel;
    private readonly reportService;
    constructor(repCommentModel: Model<RepCommentDocument>, reportService: ReportService);
    create(data: CreateRepCommentDTO, user: UserDocument): Promise<RepComment>;
    findOne(id: string): Promise<RepComment>;
    delete(id: string): Promise<RepComment>;
    update(data: UpdateRepCommentDTO): Promise<RepComment>;
    findAll(): Promise<RepComment[]>;
    findByReport(report_id: any): Promise<RepCommentDocument[]>;
    seedRepComment(): Promise<RepCommentDocument[]>;
}
