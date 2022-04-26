/// <reference types="mongoose" />
import { CreateAffidavitDTO, UpdateAffidavitDTO } from '../dto/affidavit.dto';
import { Affidavit } from '../schema/affidavit.schema';
import { AffidavitService } from '../services/affidavit.service';
export declare class AffidavitController {
    private readonly affidavitService;
    constructor(affidavitService: AffidavitService);
    findAll(): Promise<Affidavit[]>;
    findOne(id: string): Promise<Affidavit>;
    create(data: CreateAffidavitDTO): Promise<Affidavit>;
    update(data: UpdateAffidavitDTO): Promise<Affidavit>;
    delete(id: string): Promise<Affidavit>;
    seedAffidavit(): Promise<(Affidavit & Document & {
        _id: any;
        id: any;
        _doc: any;
    } & import("mongoose").Document<any, any, import("../schema/affidavit.schema").AffidavitDocument>)[]>;
}
