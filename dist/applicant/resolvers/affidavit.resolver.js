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
exports.AffidavitResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const affidavit_schema_1 = require("../schema/affidavit.schema");
const affidavit_service_1 = require("../services/affidavit.service");
let AffidavitResolver = class AffidavitResolver {
    constructor(affidavitService) {
        this.affidavitService = affidavitService;
    }
    async getAffidavits() {
        return await this.affidavitService.findAll();
    }
    async getAffidavit(id) {
        return await this.affidavitService.findOne(id);
    }
    async getAffidavitByApplicant(applicant_id) {
        return await this.affidavitService.findByApplicant(applicant_id);
    }
    async createAffidavit(input) {
        return await this.affidavitService.create(input);
    }
    async deleteAffidavit(id) {
        return await this.affidavitService.deleteAffidavit(id);
    }
    async deleteManyAffidavit() {
        return await this.affidavitService.deleteAllAffidavitWithoutApplicants();
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AffidavitResolver.prototype, "getAffidavits", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AffidavitResolver.prototype, "getAffidavit", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('applicant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AffidavitResolver.prototype, "getAffidavitByApplicant", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affidavit_schema_1.Affidavit]),
    __metadata("design:returntype", Promise)
], AffidavitResolver.prototype, "createAffidavit", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AffidavitResolver.prototype, "deleteAffidavit", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AffidavitResolver.prototype, "deleteManyAffidavit", null);
AffidavitResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [affidavit_service_1.AffidavitService])
], AffidavitResolver);
exports.AffidavitResolver = AffidavitResolver;
//# sourceMappingURL=affidavit.resolver.js.map