"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const applicant_shema_1 = require("../applicant/schema/applicant.shema");
const location_middleware_1 = require("../middlewares/location.middleware");
const user_schema_1 = require("../user/entity/user.schema");
const user_service_1 = require("../user/user.service");
const config_1 = require("../utils/config");
const auth_controller_1 = require("./auth.controller");
const auth_resolver_1 = require("./auth.resolver");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        providers: [
            jwt_strategy_1.JwtStrategy,
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
            jwt_strategy_1.SessionSerializer,
            user_service_1.UserService,
        ],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: applicant_shema_1.Applicant.name, schema: applicant_shema_1.ApplicantSchema },
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: config_1.default.SECRET || 'khdkdkfkfkfk',
            }),
            common_1.CacheModule.register(),
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule, auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map