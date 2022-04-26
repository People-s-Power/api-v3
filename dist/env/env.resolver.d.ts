import { UserDocument } from 'src/user/entity/user.schema';
import { EnvDocument } from './env.schema';
import { EnvService } from './env.service';
export declare class EnvResolver {
    private readonly envService;
    constructor(envService: EnvService);
    getEnvs(): Promise<EnvDocument[]>;
    getEnv(id: string): Promise<EnvDocument>;
    createEnv(input: EnvDocument): Promise<EnvDocument>;
    updateEnv(input: EnvDocument, user: UserDocument): Promise<EnvDocument>;
    deleteEnv(id: string, user: UserDocument): Promise<EnvDocument>;
}
