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
exports.WsGuard = exports.RestAuthGuard = exports.CustomLoginGuard = exports.LoginGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/entity/user.schema");
const config_1 = require("../../utils/config");
let LoginGuard = class LoginGuard extends passport_1.AuthGuard('local') {
    async canActivate(context) {
        await super.canActivate(context);
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return true;
    }
};
LoginGuard = __decorate([
    common_1.Injectable()
], LoginGuard);
exports.LoginGuard = LoginGuard;
let CustomLoginGuard = class CustomLoginGuard extends passport_1.AuthGuard('custom') {
    async canActivate(context) {
        await super.canActivate(context);
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return true;
    }
};
CustomLoginGuard = __decorate([
    common_1.Injectable()
], CustomLoginGuard);
exports.CustomLoginGuard = CustomLoginGuard;
let RestAuthGuard = class RestAuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return await request.isAuthenticated();
    }
};
RestAuthGuard = __decorate([
    common_1.Injectable()
], RestAuthGuard);
exports.RestAuthGuard = RestAuthGuard;
let WsGuard = class WsGuard {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async canActivate(context) {
        var _a, _b;
        const client = context.switchToWs().getClient();
        const token = (_b = (_a = client.handshake) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
        const validToken = jsonwebtoken_1.verify(token, config_1.default.SECRET);
        if (validToken) {
            const user = await this.userModel
                .findById(validToken)
                .select('-password');
            context.switchToHttp().getRequest().user = user;
            return true;
        }
        else {
            return false;
        }
    }
};
WsGuard = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WsGuard);
exports.WsGuard = WsGuard;
//# sourceMappingURL=local.guard.js.map