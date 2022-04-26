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
exports.CampaignController = void 0;
const common_1 = require("@nestjs/common");
const local_guard_1 = require("../../auth/guards/local.guard");
const campaign_dto_1 = require("../dto/campaign.dto");
const campaign_gateway_1 = require("../gateway/campaign.gateway");
const campaign_service_1 = require("../services/campaign.service");
let CampaignController = class CampaignController {
    constructor(campaignService, campaignGateway) {
        this.campaignService = campaignService;
        this.campaignGateway = campaignGateway;
    }
    create(data, req) {
        return this.campaignService.create(data, req.user);
    }
    async getSession(id, req) {
        const campaign = await this.campaignService.updateSession(id, req.sessionID);
        return campaign.id;
    }
    findAll() {
        return this.campaignService.findAll();
    }
    findAllNotice(model) {
        return this.campaignService.findAllNotice(model);
    }
    findOne(slug) {
        return this.campaignService.findOne(slug);
    }
    async myCampaign(req) {
        var _a;
        return this.campaignService.myCampaigns((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    }
    update(data) {
        return this.campaignService.update(data);
    }
    async delete(id) {
        const campaign = await this.campaignService.delete(id);
        return campaign.id;
    }
    async like(id, req) {
        return await this.campaignService.like(id, req.user);
    }
    async approveCampaign(data) {
        return await this.campaignService.approveCampaign(data.campaign_id);
    }
    async viewCamp(id, data) {
        const userId = data.userId;
        const result = await this.campaignService.viewedBy(id, userId);
        return result;
    }
};
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaign_dto_1.CreateCampaignDTO, Object]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "create", null);
__decorate([
    common_1.Get('session/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "getSession", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findAll", null);
__decorate([
    common_1.Get('notice'),
    __param(0, common_1.Query('model')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findAllNotice", null);
__decorate([
    common_1.Get(':slug'),
    __param(0, common_1.Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Get('mycampaign'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "myCampaign", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaign_dto_1.UpdateCampaignDTO]),
    __metadata("design:returntype", void 0)
], CampaignController.prototype, "update", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Delete('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "delete", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post('like'),
    __param(0, common_1.Body('id')),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "like", null);
__decorate([
    common_1.Post('approve'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "approveCampaign", null);
__decorate([
    common_1.Put('/viewCamp/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "viewCamp", null);
CampaignController = __decorate([
    common_1.Controller('api/v3/campaign'),
    __metadata("design:paramtypes", [campaign_service_1.CampaignService,
        campaign_gateway_1.CampaignGateway])
], CampaignController);
exports.CampaignController = CampaignController;
//# sourceMappingURL=campaign.controller.js.map