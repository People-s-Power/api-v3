import { Affidavit } from 'src/applicant/schema/affidavit.schema';
import { AffidavitService } from '../services/affidavit.service';
export declare class AffidavitResolver {
    private readonly affidavitService;
    constructor(affidavitService: AffidavitService);
    getAffidavits(): Promise<Affidavit[]>;
    getAffidavit(id: string): Promise<Affidavit>;
    getAffidavitByApplicant(applicant_id: string): Promise<Affidavit>;
    createAffidavit(input: Affidavit): Promise<Affidavit>;
    deleteAffidavit(id: string): Promise<Affidavit>;
    deleteManyAffidavit(): Promise<Affidavit[]>;
}
