"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/entity/user.schema");
const user_service_1 = require("../user/user.service");
const affidavit_controller_1 = require("./controllers/affidavit.controller");
const applicant_controller_1 = require("./controllers/applicant.controller");
const affidavit_resolver_1 = require("./resolvers/affidavit.resolver");
const applicant_resolver_1 = require("./resolvers/applicant.resolver");
const affidavit_schema_1 = require("./schema/affidavit.schema");
const applicant_shema_1 = require("./schema/applicant.shema");
const affidavit_service_1 = require("./services/affidavit.service");
const applicant_service_1 = require("./services/applicant.service");
const exhibit_controller_1 = require("./controllers/exhibit.controller");
const exhibit_service_1 = require("./services/exhibit.service");
const exhibit_resolver_1 = require("./resolvers/exhibit.resolver");
const exhibit_schema_1 = require("./schema/exhibit.schema");
const relative_schema_1 = require("./schema/relative.schema");
const relative_resolver_1 = require("./resolvers/relative.resolver");
const relative_service_1 = require("./services/relative.service");
const relative_controller_1 = require("./controllers/relative.controller");
const report_resolver_1 = require("./resolvers/report.resolver");
const report_controller_1 = require("./controllers/report.controller");
const report_service_1 = require("./services/report.service");
const report_schema_1 = require("./schema/report.schema");
const rep_comment_service_1 = require("./services/rep-comment.service");
const rep_comment_controller_1 = require("./controllers/rep-comment.controller");
let ApplicantModule = class ApplicantModule {
};
ApplicantModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: applicant_shema_1.Applicant.name, schema: applicant_shema_1.ApplicantSchema },
                { name: affidavit_schema_1.Affidavit.name, schema: affidavit_schema_1.AffidavitSchema },
                { name: exhibit_schema_1.Exhibit.name, schema: exhibit_schema_1.ExhibitSchema },
                { name: relative_schema_1.Relative.name, schema: relative_schema_1.RelativeSchema },
                { name: report_schema_1.Report.name, schema: report_schema_1.ReportSchema },
                { name: report_schema_1.RepComment.name, schema: report_schema_1.RepCommentSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            common_1.CacheModule.register(),
        ],
        providers: [
            applicant_resolver_1.ApplicantResolver,
            applicant_service_1.ApplicantService,
            affidavit_service_1.AffidavitService,
            affidavit_resolver_1.AffidavitResolver,
            user_service_1.UserService,
            exhibit_service_1.ExhibitService,
            exhibit_resolver_1.ExhibitResolver,
            relative_resolver_1.RelativeResolver,
            relative_service_1.RelativeService,
            report_resolver_1.ReportResolver,
            report_service_1.ReportService,
            rep_comment_service_1.RepCommentService,
        ],
        controllers: [
            applicant_controller_1.ApplicantController,
            affidavit_controller_1.AffidavitController,
            exhibit_controller_1.ExhibitController,
            relative_controller_1.RelativeController,
            report_controller_1.ReportController,
            rep_comment_controller_1.RepCommentController,
        ],
    })
], ApplicantModule);
exports.ApplicantModule = ApplicantModule;
//# sourceMappingURL=applicant.module.js.map