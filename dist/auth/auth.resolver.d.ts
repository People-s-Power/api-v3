import { ReqWithUser } from 'src/typings';
import { User } from 'src/user/entity/user.schema';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    registerWithEmail(input: User): Promise<Partial<import("src/user/entity/user.schema").UserDocument>>;
    loginWithEmail(email: string, password: string, phone: string, req: ReqWithUser): Promise<{
        user: Partial<import("src/user/entity/user.schema").UserDocument>;
        token: string;
    }>;
}
