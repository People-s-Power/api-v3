// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Request } from 'express';
// import { Strategy } from 'passport-custom';
// import { ISession } from 'src/typings';
// import { UserDocument } from 'src/user/entity/user.schema';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(req: Request): Promise<any> {
//     const { email, password, googleId } = req.body;
//     const session: ISession = req.session;
//     let user: Partial<UserDocument>;
//     if (googleId) {
//       user = await this.authService.registerWithGoogle({
//         ...req.body,
//         country: session.location?.country_name,
//         city: session?.location?.city,
//       });
//     } else {
//       user = await this.authService.loginWithEmail(email, password);
//     }

//     if (!user) throw new UnauthorizedException('Access denied');

//     return user;
//   }
// }
