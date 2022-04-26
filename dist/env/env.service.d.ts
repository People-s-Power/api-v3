import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { EnvDocument } from './env.schema';
export declare class EnvService {
    private readonly envModel;
    constructor(envModel: Model<EnvDocument>);
    createEnv(data: EnvDocument): Promise<EnvDocument>;
    updateEnv(data: EnvDocument, user: UserDocument): Promise<EnvDocument>;
    deleteEnv(id: string, user: UserDocument): Promise<EnvDocument>;
    getEnvs(): Promise<EnvDocument[]>;
    getEnv(id: string): Promise<EnvDocument>;
}
