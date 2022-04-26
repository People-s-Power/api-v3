"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const affidavit_schema_1 = require("../applicant/schema/affidavit.schema");
const applicant_shema_1 = require("../applicant/schema/applicant.shema");
const report_schema_1 = require("../applicant/schema/report.schema");
const applicant_service_1 = require("../applicant/services/applicant.service");
const rep_comment_service_1 = require("../applicant/services/rep-comment.service");
const report_service_1 = require("../applicant/services/report.service");
const user_schema_1 = require("./entity/user.schema");
const user_controller_1 = require("./user.controller");
const user_resolver_1 = require("./user.resolver");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: applicant_shema_1.Applicant.name,
                    schema: applicant_shema_1.ApplicantSchema,
                },
                { name: report_schema_1.Report.name, schema: report_schema_1.ReportSchema },
                { name: affidavit_schema_1.Affidavit.name, schema: affidavit_schema_1.AffidavitSchema },
                { name: report_schema_1.RepComment.name, schema: report_schema_1.RepCommentSchema },
            ]),
            common_1.CacheModule.register(),
        ],
        providers: [
            user_resolver_1.UserResolver,
            user_service_1.UserService,
            applicant_service_1.ApplicantService,
            report_service_1.ReportService,
            rep_comment_service_1.RepCommentService,
        ],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map