import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
declare const LoginGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LoginGuard extends LoginGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
declare const CustomLoginGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CustomLoginGuard extends CustomLoginGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class RestAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>;
}
export declare class WsGuard implements CanActivate {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
