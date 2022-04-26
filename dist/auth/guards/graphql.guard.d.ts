import { CanActivate } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
declare const GQLoginGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GQLoginGuard extends GQLoginGuard_base {
    getRequest(context: ExecutionContext): any;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class GQLGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const ResGql: (...dataOrPipes: any[]) => ParameterDecorator;
export declare const GqlUser: (...dataOrPipes: any[]) => ParameterDecorator;
export {};
