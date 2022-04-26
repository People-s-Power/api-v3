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
exports.CampaignResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../../auth/guards/graphql.guard");
const user_schema_1 = require("../../user/entity/user.schema");
const campaign_service_1 = require("../services/campaign.service");
const endorsement_service_1 = require("../services/endorsement.service");
let CampaignResolver = class CampaignResolver {
    constructor(campaignService, endorsementService) {
        this.campaignService = campaignService;
        this.endorsementService = endorsementService;
    }
    async myCampaign(user) {
        return await this.campaignService.myCampaigns(user === null || user === void 0 ? void 0 : user.id);
    }
    async getCampaigns(limit) {
        return await this.campaignService.findAll(limit);
    }
    async getCampaign(slug) {
        return await this.campaignService.findOne(slug);
    }
    async getActiveCampaigns() {
        return await this.campaignService.findAllActive();
    }
    async deleteCampaign(id) {
        return await this.campaignService.delete(id);
    }
};
__decorate([
    common_1.UseGuards(graphql_guard_1.GQLGuard),
    graphql_1.Query(),
    __param(0, graphql_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "myCampaign", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "getCampaigns", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "getCampaign", null);
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "getActiveCampaigns", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "deleteCampaign", null);
CampaignResolver = __decorate([
    graphql_1.Resolver('Campaign'),
    __metadata("design:paramtypes", [campaign_service_1.CampaignService,
        endorsement_service_1.EndorsementService])
], CampaignResolver);
exports.CampaignResolver = CampaignResolver;
//# sourceMappingURL=campaign.resolver.js.map