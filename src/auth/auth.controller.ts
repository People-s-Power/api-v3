import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ISession, ReqWithUser } from 'src/typings';
import {
  ChangePasswordDTO,
  LoginWithEmailDTO,
  RegisterWithEmailDTO,
} from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RestAuthGuard } from './guards/local.guard';

@Controller('api/v3/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  home() {
    return 'Welcome to auth';
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: ReqWithUser) {
    return req.user;
  }

  @Post('login')
  @ApiParam({
    type: LoginWithEmailDTO,
    name: 'login',
  })
  async login(@Body() data: { email: string; password: string }) {
    const result = await this.authService.loginWithEmail(
      data.email,
      data.phone,
      data.password,
    );

    return {
      id: result.user.id,
      token: result.token,
      isActive: result.user.isActive,
    };
  }

  @Post('register')
  async register(
    @Body() data: RegisterWithEmailDTO,
    @Session() session: ISession,
  ) {
    const location = session.location;
    const user = await this.authService.registerWithEmail({
      ...data,
      location,
    });

    return user.id;
  }
  @Post('register-google')
  async registerWithGoogleAndFacebook(@Body() data: any) {
    const result = await this.authService.registerWithGoogleAndFacebook(data);

    return { id: result.user.id, token: result.token };
  }

  @Post('google-facebook')
  async googleAndFacebook(@Req() req: ReqWithUser, @Body() data: any) {
    const result = await this.authService.registerWithGoogleAndFacebook(data);
    return { id: result.user.id, token: result.token };
  }

  @Get('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.logOut();
    res.clearCookie('__ed');
    res.clearCookie('token');
    req.session.destroy((err) => {
      if (err) throw err;
    });
    return 'Okay';
  }
  @Post('forgot-password')
  async forgotPassword(@Body() data: { email: string }) {
    const user = await this.authService.forgotPassword(data.email);
    return user?.id;
  }
  @Post('verify-token')
  async verifyToken(@Body() data: { token: string }) {
    const user = await this.authService.verifyToken(data.token);
    return user?.id;
  }
  @Post('resend-token')
  async resendToken(@Body() data: { email: string }) {
    const user = await this.authService.resendVerificationToken(data.email);
    return user.id;
  }
  @UseGuards(RestAuthGuard)
  @Post('change-password')
  async changePassword(@Body() data: ChangePasswordDTO) {
    const user = await this.authService.changePassword(data);
    return { id: user.id, email: user.email };
  }
}
