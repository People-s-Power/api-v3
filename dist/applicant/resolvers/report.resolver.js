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
exports.ReportResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../../auth/guards/graphql.guard");
const rep_comment_service_1 = require("../services/rep-comment.service");
const report_service_1 = require("../services/report.service");
let ReportResolver = class ReportResolver {
    constructor(reportService, commentService) {
        this.reportService = reportService;
        this.commentService = commentService;
    }
    async getReports() {
        return this.reportService.findAll();
    }
    async getReport(_id) {
        return this.reportService.findOne(_id);
    }
    async getMyReports(req) {
        return this.reportService.findByUser(req.user);
    }
    async getApplicantsReport(applicant_id) {
        return this.reportService.findByApplicant(applicant_id);
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "getReports", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "getReport", null);
__decorate([
    common_1.UseGuards(graphql_guard_1.GQLGuard),
    graphql_1.Query(),
    __param(0, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "getMyReports", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('applicant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "getApplicantsReport", null);
ReportResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [report_service_1.ReportService,
        rep_comment_service_1.RepCommentService])
], ReportResolver);
exports.ReportResolver = ReportResolver;
//# sourceMappingURL=report.resolver.js.map