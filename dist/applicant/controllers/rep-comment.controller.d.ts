import { ReqWithUser } from 'src/typings';
import { CreateRepCommentDTO, UpdateRepCommentDTO } from '../dto/report.dto';
import { RepCommentService } from '../services/rep-comment.service';
export declare class RepCommentController {
    private readonly commentService;
    constructor(commentService: RepCommentService);
    create(data: CreateRepCommentDTO, req: ReqWithUser): Promise<import("../schema/report.schema").RepComment>;
    update(data: UpdateRepCommentDTO): Promise<import("../schema/report.schema").RepComment>;
    findAll(): Promise<import("../schema/report.schema").RepComment[]>;
    findByReport(id: string): Promise<import("../schema/report.schema").RepCommentDocument[]>;
    findOne(id: string): Promise<import("../schema/report.schema").RepComment>;
    delete(id: string): Promise<import("../schema/report.schema").RepComment>;
    seed(): Promise<import("../schema/report.schema").RepCommentDocument[]>;
}
