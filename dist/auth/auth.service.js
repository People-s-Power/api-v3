"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const user_dto_1 = require("../user/dto/user.dto");
const user_schema_1 = require("../user/entity/user.schema");
const config_1 = require("../utils/config");
const sendMail_1 = require("../utils/sendMail");
let AuthService = class AuthService {
    constructor(userModel, req, jwtService) {
        this.userModel = userModel;
        this.req = req;
        this.jwtService = jwtService;
    }
    async registerWithEmail(data) {
        var _a, _b, _c, _d;
        const { password, email } = data;
        let user = await this.userModel.findOne({ email });
        const session = this.req.session;
        console.log(session.location);
        if (user)
            throw new common_1.BadRequestException('Email already exist, signin instead');
        const payload = Object.assign(Object.assign({}, data), { password: bcrypt.hashSync(password, 10), emailToken: (Math.floor(Math.random() * 90000) + 10000).toString(), firstName: (_b = (_a = data === null || data === void 0 ? void 0 : data.name) === null || _a === void 0 ? void 0 : _a.split(' ')) === null || _b === void 0 ? void 0 : _b[0], lastName: (_d = (_c = data === null || data === void 0 ? void 0 : data.name) === null || _c === void 0 ? void 0 : _c.split(' ')) === null || _d === void 0 ? void 0 : _d[1] });
        try {
            user = await this.userModel.create(payload);
            console.log(user);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async registerWithGoogleAndFacebook(data) {
        let user = await this.userModel
            .findOne({ email: data.email })
            .select('-password');
        if (user) {
            try {
                await this.userModel.findByIdAndUpdate(user.id, Object.assign(Object.assign({}, data), { image: user.image ? user.image : data.image }), { new: true });
                const token = this.jwtService.sign(user.id);
                return { user, token };
            }
            catch (error) {
                throw error;
            }
        }
        try {
            user = await this.userModel.create(Object.assign(Object.assign({}, data), { isActive: true }));
            const token = this.jwtService.sign(user.id);
            return { user, token };
        }
        catch (error) {
            throw error;
        }
    }
    async loginWithEmail(email, phone, password) {
        try {
            let user;
            if (!email) {
                user = await this.userModel.findOne({ phone });
            }
            if (!phone) {
                user = await this.userModel.findOne({ email });
            }
            if (!user)
                throw new common_1.NotFoundException('You are not registered here');
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch)
                throw new common_1.UnauthorizedException('Email or password not correct');
            // if (user.accountType === user_dto_1.AccountTypeEnum.Staff) {
            //     if (!(user === null || user === void 0 ? void 0 : user.isActive))
            //         throw new common_1.BadRequestException('Please contact support@edfhr.org to activate your account');
            // }
            const { firstName, lastName, image, id, role, accountType, reps, isActive, } = user;
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
        }
        catch (error) {
            throw error;
        }
    }
    async getMe(data) {
        try {
            await this.userModel.updateOne({ _id: data === null || data === void 0 ? void 0 : data.id }, {
                $set: { lastSeen: new Date() },
            });
            const user = await this.userModel.findById(data === null || data === void 0 ? void 0 : data.id).select('-password');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async forgotPassword(email) {
        const user = await this.userModel.findOne({ email }).select('-password');
        if (!user)
            throw new common_1.NotFoundException('No record found');
        const token = Math.floor(Math.random() * 90000) + 10000;
        try {
            await this.userModel.findByIdAndUpdate(user.id, {
                $set: { emailToken: token === null || token === void 0 ? void 0 : token.toString() },
            });
            await sendMail_1.sendMail(user === null || user === void 0 ? void 0 : user.email, 'Change Password', `Here is your verification code ${token}`);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyToken(token) {
        if (!token)
            throw new common_1.NotFoundException('No verification code');
        const user = await this.userModel
            .findOne({ emailToken: token })
            .select('-password');
        if (!user)
            throw new common_1.NotFoundException('Invalid token');
        try {
            await this.userModel.findByIdAndUpdate(user.id, { $set: { isActive: true, emailToken: '' } }, { multi: true, new: true });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async resendVerificationToken(email) {
        try {
            let user = await this.userModel.findOne({ email });
            if (!user)
                throw new common_1.NotFoundException('Please enter your registered email address');
            const emailToken = (Math.floor(Math.random() * 90000) + 10000).toString();
            await sendMail_1.sendMail(email, 'Verify your email', `Here is your verification code ${emailToken}`).catch((err) => {
                throw err;
            });
            user = await this.userModel.findByIdAndUpdate(user.id, {
                $set: {
                    emailToken,
                },
            }, { new: true });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(data) {
        const reqUser = this.req.user;
        let user = await this.userModel.findById(reqUser.id);
        if (!user)
            throw new common_1.NotFoundException('No record found');
        const isMatch = bcrypt.compareSync(data.oldPassword, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('invalid password');
        try {
            user = await this.userModel.findByIdAndUpdate(data.id, {
                $set: { password: bcrypt.hashSync(data.newPassword, 10) },
            });
            await sendMail_1.sendMail(user === null || user === void 0 ? void 0 : user.email, 'Change Password', `Your password was changed successfully. If you did not change it, click <a href="https://edfhr.org/auth?mode=change password&&id=${user === null || user === void 0 ? void 0 : user.id}">here</a> to reset your password again`);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyUser(token) {
        const validToken = jsonwebtoken_1.verify(token, config_1.default.SECRET, (err) => {
            if (err)
                throw new common_1.BadRequestException(err);
        });
        try {
            const user = await this.userModel
                .findById(validToken)
                .select('-password');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(1, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_2.Model, Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map