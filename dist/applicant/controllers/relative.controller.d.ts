import { CreateRelativeDTO, UpdateRelativeDTO } from '../dto/relative.dto';
import { RelativeService } from '../services/relative.service';
export declare class RelativeController {
    private readonly relativeService;
    constructor(relativeService: RelativeService);
    create(data: CreateRelativeDTO): Promise<import("../schema/relative.schema").Relative>;
    update(data: UpdateRelativeDTO): Promise<import("../schema/relative.schema").Relative>;
    delete(id: string): Promise<import("../schema/relative.schema").Relative>;
    findAll(): Promise<import("../schema/relative.schema").Relative[]>;
    findOne(id: string): Promise<import("../schema/relative.schema").Relative>;
    findByApplicant(id: string): Promise<import("../schema/relative.schema").Relative[]>;
    seedRelatives(): Promise<import("../schema/relative.schema").RelativeDocument>;
}
