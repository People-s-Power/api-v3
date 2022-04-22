import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from 'src/user/entity/user.schema';
import config from 'src/utils/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findById(payload).select('-password');

    return user;
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    // console.log('deserialize:', payload);
    done(null, payload);
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    // console.log('serialize:', user);
    done(null, user);
  }
}
