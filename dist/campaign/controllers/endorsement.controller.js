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
exports.EndorsementController = void 0;
const common_1 = require("@nestjs/common");
const local_guard_1 = require("../../auth/guards/local.guard");
const endorsement_dto_1 = require("../dto/endorsement.dto");
const endorsement_service_1 = require("../services/endorsement.service");
let EndorsementController = class EndorsementController {
    constructor(endorsementService) {
        this.endorsementService = endorsementService;
    }
    findAll() {
        return this.endorsementService.findAll();
    }
    findOne(id) {
        return this.endorsementService.findOne(id);
    }
    findByCampaign(id) {
        return this.endorsementService.findByCampaign(id);
    }
    create(data, req) {
        return this.endorsementService.create(data, req.user);
    }
    update(data) {
        return this.endorsementService.update(data);
    }
    like(data, req) {
        return this.endorsementService.like(data, req.user);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EndorsementController.prototype, "findAll", null);
__decorate([
    common_1.Get('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EndorsementController.prototype, "findOne", null);
__decorate([
    common_1.Get('/campaign/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EndorsementController.prototype, "findByCampaign", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [endorsement_dto_1.CreateEndorsementDTO, Object]),
    __metadata("design:returntype", void 0)
], EndorsementController.prototype, "create", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [endorsement_dto_1.UpdateEndorsementDTO]),
    __metadata("design:returntype", void 0)
], EndorsementController.prototype, "update", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post('like'),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [endorsement_dto_1.LikeEndorsementDTO, Object]),
    __metadata("design:returntype", void 0)
], EndorsementController.prototype, "like", null);
EndorsementController = __decorate([
    common_1.Controller('api/v3/endorsement'),
    __metadata("design:paramtypes", [endorsement_service_1.EndorsementService])
], EndorsementController);
exports.EndorsementController = EndorsementController;
//# sourceMappingURL=endorsement.controller.js.map