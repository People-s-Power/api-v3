import { Model } from 'mongoose';
import { CreateExhibitDTO, UpdateExhibitDTO } from '../dto/exhibit.dto';
import { Exhibit, ExhibitDocument } from '../schema/exhibit.schema';
export declare class ExhibitService {
    private readonly exhibitModel;
    constructor(exhibitModel: Model<ExhibitDocument>);
    create(data: CreateExhibitDTO): Promise<Exhibit>;
    findAll(): Promise<Exhibit[]>;
    findByApplicant(applicant_id: any): Promise<Exhibit[]>;
    findOne(id: string): Promise<Exhibit>;
    update(data: UpdateExhibitDTO): Promise<Exhibit>;
    deleteOne(id: string): Promise<Exhibit>;
    seedExhibits(): Promise<ExhibitDocument[]>;
}
