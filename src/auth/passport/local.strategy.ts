// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { User } from 'src/user/entity/user.schema';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
//   constructor(private readonly authService: AuthService) {
//     super({ usernameField: 'email' });
//   }

//   async validate(email: string, password: string): Promise<Partial<User>> {
//     const user = await this.authService.loginWithEmail(email, password);
//     if (!user) throw new UnauthorizedException('Access denied');

//     return user;
//   }
// }

// @Injectable()
// export class SessionSerializer extends PassportSerializer {
//   deserializeUser(
//     payload: any,
//     done: (err: Error, payload: string) => void,
//   ): any {
//     // console.log('deserialize:', payload);
//     done(null, payload);
//   }
//   serializeUser(user: any, done: (err: Error, user: any) => void): any {
//     // console.log('serialize:', user);
//     done(null, user);
//   }
// }
