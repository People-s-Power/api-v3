"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const applicant_module_1 = require("./applicant/applicant.module");
const auth_module_1 = require("./auth/auth.module");
const campaign_module_1 = require("./campaign/campaign.module");
const transaction_module_1 = require("./transaction/transaction.module");
const user_module_1 = require("./user/user.module");
const env_module_1 = require("./env/env.module");
const config_2 = require("./utils/config");
const campaign_schema_1 = require("./campaign/schema/campaign.schema");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            applicant_module_1.ApplicantModule,
            mongoose_1.MongooseModule.forRoot(config_2.default.MONGO_URI, {
                useFindAndModify: false,
                useNewUrlParser: true,
                useCreateIndex: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: campaign_schema_1.View.name, schema: campaign_schema_1.ViewSchema }]),
            graphql_1.GraphQLModule.forRoot({
                typePaths: ['./**/*.graphql'],
                definitions: {
                    path: path_1.join(process.cwd(), 'src/graphql.ts'),
                },
                installSubscriptionHandlers: true,
                path: '/api/v3/graphql',
                cors: false,
                buildSchemaOptions: {
                    dateScalarMode: 'timestamp',
                },
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            common_1.CacheModule.register({ ttl: 500 }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            applicant_module_1.ApplicantModule,
            campaign_module_1.CampaignModule,
            transaction_module_1.TransactionModule,
            env_module_1.EnvModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map