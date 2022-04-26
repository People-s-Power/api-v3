import { Request, Response } from 'express';
import { ISession, ReqWithUser } from 'src/typings';
import { ChangePasswordDTO, RegisterWithEmailDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    home(): string;
    me(req: ReqWithUser): Promise<import("../user/entity/user.schema").UserDocument>;
    login(data: {
        email?: string;
        phone?: string;
        password: string;
    }): Promise<{
        id: any;
        token: string;
        isActive: boolean;
    }>;
    register(data: RegisterWithEmailDTO, session: ISession): Promise<any>;
    registerWithGoogleAndFacebook(data: any): Promise<{
        id: any;
        token: string;
    }>;
    googleAndFacebook(req: ReqWithUser, data: any): Promise<{
        id: any;
        token: string;
    }>;
    logout(req: Request, res: Response): string;
    forgotPassword(data: {
        email: string;
    }): Promise<any>;
    verifyToken(data: {
        token: string;
    }): Promise<any>;
    resendToken(data: {
        email: string;
    }): Promise<any>;
    changePassword(data: ChangePasswordDTO): Promise<{
        id: any;
        email: string;
    }>;
}
