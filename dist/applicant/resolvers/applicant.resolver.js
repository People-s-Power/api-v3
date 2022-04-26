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
exports.ApplicantResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const applicant_service_1 = require("../services/applicant.service");
const applicant_shema_1 = require("../schema/applicant.shema");
const common_1 = require("@nestjs/common");
const graphql_guard_1 = require("../../auth/guards/graphql.guard");
const applicant_dto_1 = require("../dto/applicant.dto");
const user_schema_1 = require("../../user/entity/user.schema");
let ApplicantResolver = class ApplicantResolver {
    constructor(applicantService) {
        this.applicantService = applicantService;
    }
    getApplicants(user) {
        return this.applicantService.findAll(user);
    }
    async getApplicant(id) {
        return await this.applicantService.findOne(id);
    }
    async getUserApplicants(id) {
        return await this.applicantService.findByUser(id);
    }
    async showDraft(id) {
        return await this.applicantService.getDraft(id);
    }
    async createApplicant(input, req) {
        return await this.applicantService.create(input, req.user);
    }
    async deleteApplicant(id) {
        return await this.applicantService.delete(id);
    }
    async uploadForm(input) {
        return await this.applicantService.uploadContactForm(input);
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicantResolver.prototype, "getApplicants", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "getApplicant", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "getUserApplicants", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "showDraft", null);
__decorate([
    common_1.UseGuards(graphql_guard_1.GQLGuard),
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __param(1, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applicant_shema_1.Applicant, Object]),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "createApplicant", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "deleteApplicant", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applicant_dto_1.UploadContactFormDTO]),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "uploadForm", null);
ApplicantResolver = __decorate([
    graphql_1.Resolver('Applicant'),
    __metadata("design:paramtypes", [applicant_service_1.ApplicantService])
], ApplicantResolver);
exports.ApplicantResolver = ApplicantResolver;
//# sourceMappingURL=applicant.resolver.js.map