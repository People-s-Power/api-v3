import { RelativeService } from '../services/relative.service';
export declare class RelativeResolver {
    private readonly relativeService;
    constructor(relativeService: RelativeService);
    getRelativesByApplicant(applicant_id: string): Promise<import("../schema/relative.schema").Relative[]>;
}
