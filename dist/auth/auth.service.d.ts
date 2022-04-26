import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { ReqWithUser } from 'src/typings';
import { ChangePasswordDTO, RegisterWithEmailDTO } from 'src/user/dto/user.dto';
import { UserDocument } from 'src/user/entity/user.schema';
export declare class AuthService {
    private readonly userModel;
    private readonly req;
    private jwtService;
    constructor(userModel: Model<UserDocument>, req: ReqWithUser, jwtService: JwtService);
    registerWithEmail(data: Partial<RegisterWithEmailDTO>): Promise<Partial<UserDocument>>;
    registerWithGoogleAndFacebook(data: UserDocument): Promise<{
        user: Partial<UserDocument>;
        token: string;
    }>;
    loginWithEmail(email: string, phone: string, password: string): Promise<{
        user: Partial<UserDocument>;
        token: string;
    }>;
    getMe(data: UserDocument): Promise<UserDocument>;
    forgotPassword(email: string): Promise<UserDocument>;
    verifyToken(token: string): Promise<UserDocument>;
    resendVerificationToken(email: string): Promise<UserDocument>;
    changePassword(data: ChangePasswordDTO): Promise<UserDocument>;
    verifyUser(token: string): Promise<Partial<UserDocument>>;
}
