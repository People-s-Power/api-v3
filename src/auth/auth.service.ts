import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { ISession, ReqWithUser } from 'src/typings';
import {
  AccountTypeEnum,
  ChangePasswordDTO,
  RegisterWithEmailDTO,
} from 'src/user/dto/user.dto';
import { User, UserDocument } from 'src/user/entity/user.schema';
import config, { CLIENT_URL } from 'src/utils/config';
import { sendMail } from 'src/utils/sendMail';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(REQUEST) private readonly req: ReqWithUser,
    private jwtService: JwtService,
  ) {}
  async registerWithEmail(
    data: Partial<RegisterWithEmailDTO>,
  ): Promise<Partial<UserDocument>> {
    const { password, email } = data;
    let user = await this.userModel.findOne({ email });
    const session: ISession = this.req.session;

    console.log(session.location);
    if (user)
      throw new BadRequestException('Email already exist, signin instead');
    const payload: Partial<User> = {
      ...data,
      password: bcrypt.hashSync(password, 10),
      emailToken: (Math.floor(Math.random() * 90000) + 10000).toString(),
      // name: `${data?.firstName} ${data?.lastName}`,
      firstName: data?.name?.split(' ')?.[0],
      lastName: data?.name?.split(' ')?.[1],
    };
    // const html = `
    //   <h3>Thank you for registering with EDFHR</h3>
    //   <p>Please click to <a href="${CLIENT_URL}/auth?mode=verify token&token=${payload.emailToken}">Verify your account</a> or copy your verification code ${payload.emailToken} </p>
  
    // `;
    // console.log(user)
    try {
      // await sendMail(payload.email, 'Verify your email', html);
      user = await this.userModel.create(payload);
      console.log(user)

      return user;
    } catch (error) {
      throw error;
    }
  }
  async registerWithGoogleAndFacebook(
    data: UserDocument,
  ): Promise<{ user: Partial<UserDocument>; token: string }> {
    let user = await this.userModel
      .findOne({ email: data.email })
      .select('-password');
    if (user) {
      try {
        await this.userModel.findByIdAndUpdate(
          user.id,
          { ...data, image: user.image ? user.image : data.image },
          { new: true },
        );
        const token = this.jwtService.sign(user.id);
        return { user, token };
      } catch (error) {
        throw error;
      }
    }
    try {
      user = await this.userModel.create({ ...data, isActive: true });
      const token = this.jwtService.sign(user.id);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmail(
    email: string,
    phone: string,
    password: string,
  ): Promise<{ user: Partial<UserDocument>; token: string }> {
    try {
      let user
      if(!email) {
        user = await this.userModel.findOne({ phone });
      }
      if(!phone) {
        user = await this.userModel.findOne({ email });
      }
      if (!user) throw new NotFoundException('You are not registered here');

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch)
        throw new UnauthorizedException('Email or password not correct');

      if (user.accountType === AccountTypeEnum.Staff) {
        if (!user?.isActive)
          throw new BadRequestException(
            'Please contact support@edfhr.org to activate your account',
          );
      }

      const {
        firstName,
        lastName,
        image,
        id,
        role,
        accountType,
        reps,
        isActive,
      } = user;
      const token = this.jwtService.sign(user.id);

      return {
        user: {
          firstName,
          lastName,
          image,
          role,
          email,
          id,
          accountType,
          reps,
          isActive,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMe(data: UserDocument): Promise<UserDocument> {
    try {
      await this.userModel.updateOne(
        { _id: data?.id },
        {
          $set: { lastSeen: new Date() },
        },
      );
      const user = await this.userModel.findById(data?.id).select('-password');
      return user;
    } catch (error) {
      throw error;
    }
  }
  // Forgot Password
  async forgotPassword(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).select('-password');
    if (!user) throw new NotFoundException('No record found');
    const token = Math.floor(Math.random() * 90000) + 10000;
    try {
      await this.userModel.findByIdAndUpdate(user.id, {
        $set: { emailToken: token?.toString() },
      });

      await sendMail(
        user?.email,
        'Change Password',
        `Here is your verification code ${token}`,
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token: string): Promise<UserDocument> {
    if (!token) throw new NotFoundException('No verification code');
    const user = await this.userModel
      .findOne({ emailToken: token })
      .select('-password');
    if (!user) throw new NotFoundException('Invalid token');
    try {
      await this.userModel.findByIdAndUpdate(
        user.id,
        { $set: { isActive: true, emailToken: '' } },
        { multi: true, new: true },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async resendVerificationToken(email: string): Promise<UserDocument> {
    try {
      let user = await this.userModel.findOne({ email });
      if (!user)
        throw new NotFoundException(
          'Please enter your registered email address',
        );
      const emailToken = (Math.floor(Math.random() * 90000) + 10000).toString();
      await sendMail(
        email,
        'Verify your email',
        `Here is your verification code ${emailToken}`,
      ).catch((err) => {
        throw err;
      });
      user = await this.userModel.findByIdAndUpdate(
        user.id,
        {
          $set: {
            emailToken,
          },
        },
        { new: true },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(data: ChangePasswordDTO): Promise<UserDocument> {
    const reqUser = this.req.user;

    let user = await this.userModel.findById(reqUser.id);
    if (!user) throw new NotFoundException('No record found');
    const isMatch = bcrypt.compareSync(data.oldPassword, user.password);
    if (!isMatch) throw new UnauthorizedException('invalid password');
    try {
      user = await this.userModel.findByIdAndUpdate(data.id, {
        $set: { password: bcrypt.hashSync(data.newPassword, 10) },
      });
      await sendMail(
        user?.email,
        'Change Password',
        `Your password was changed successfully. If you did not change it, click <a href="https://edfhr.org/auth?mode=change password&&id=${user?.id}">here</a> to reset your password again`,
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
  async verifyUser(token: string): Promise<Partial<UserDocument>> {
    const validToken = verify(token, config.SECRET, (err) => {
      if (err) throw new BadRequestException(err);
    });

    try {
      const user = await this.userModel
        .findById(validToken)
        .select('-password');
      return user;
    } catch (error) {
      throw error;
    }
  }
}
