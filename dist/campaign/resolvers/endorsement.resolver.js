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
exports.EndorsementResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../../auth/guards/graphql.guard");
const endorsement_dto_1 = require("../dto/endorsement.dto");
const endorsement_service_1 = require("../services/endorsement.service");
let EndorsementResolver = class EndorsementResolver {
    constructor(endorsementService) {
        this.endorsementService = endorsementService;
    }
    async getEndorsementsByCampaign(campaign_id) {
        return await this.endorsementService.findByCampaign(campaign_id);
    }
    async getEndorsements() {
        return await this.endorsementService.findAll();
    }
    async createEndorsement(input, req) {
        return await this.endorsementService.create(input, req.user);
    }
    async deleteEndorsement(id) {
        return await this.endorsementService.delete(id);
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('campaign_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EndorsementResolver.prototype, "getEndorsementsByCampaign", null);
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EndorsementResolver.prototype, "getEndorsements", null);
__decorate([
    common_1.UseGuards(graphql_guard_1.GQLGuard),
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __param(1, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [endorsement_dto_1.CreateEndorsementDTO, Object]),
    __metadata("design:returntype", Promise)
], EndorsementResolver.prototype, "createEndorsement", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EndorsementResolver.prototype, "deleteEndorsement", null);
EndorsementResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [endorsement_service_1.EndorsementService])
], EndorsementResolver);
exports.EndorsementResolver = EndorsementResolver;
//# sourceMappingURL=endorsement.resolver.js.map