import { CreateExhibitDTO, UpdateExhibitDTO } from '../dto/exhibit.dto';
import { ExhibitService } from '../services/exhibit.service';
export declare class ExhibitController {
    private readonly exhibitService;
    constructor(exhibitService: ExhibitService);
    create(data: CreateExhibitDTO): Promise<import("../schema/exhibit.schema").Exhibit>;
    findAll(): Promise<import("../schema/exhibit.schema").Exhibit[]>;
    findOne(id: string): Promise<import("../schema/exhibit.schema").Exhibit>;
    update(data: UpdateExhibitDTO): Promise<import("../schema/exhibit.schema").Exhibit>;
    delete(id: string): Promise<import("../schema/exhibit.schema").Exhibit>;
    findByApplicant(id: string): Promise<import("../schema/exhibit.schema").Exhibit[]>;
    seedExhibits(): Promise<import("../schema/exhibit.schema").ExhibitDocument[]>;
}
