import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { User, UserDocument } from 'src/user/entity/user.schema';
import config from 'src/utils/config';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    // const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return true;
  }
}

@Injectable()
export class CustomLoginGuard extends AuthGuard('custom') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return true;
  }
}

@Injectable()
export class RestAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return await request.isAuthenticated();
  }
}

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async canActivate(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token = client.handshake?.headers?.authorization;
    const validToken = verify(token, config.SECRET);
    if (validToken) {
      const user = await this.userModel
        .findById(validToken)
        .select('-password');
      context.switchToHttp().getRequest().user = user;

      return true;
    } else {
      return false;
    }
  }
}
