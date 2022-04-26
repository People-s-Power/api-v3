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
exports.ApplicantController = void 0;
const common_1 = require("@nestjs/common");
const local_guard_1 = require("../../auth/guards/local.guard");
const applicant_dto_1 = require("../dto/applicant.dto");
const applicant_service_1 = require("../services/applicant.service");
let ApplicantController = class ApplicantController {
    constructor(applicantService) {
        this.applicantService = applicantService;
    }
    async create(data, req) {
        return await this.applicantService.create(data, req.user);
    }
    findAll(req) {
        return this.applicantService.findAll(req === null || req === void 0 ? void 0 : req.user);
    }
    findOne(id) {
        return this.applicantService.findOne(id);
    }
    draft(id) {
        return this.applicantService.getDraft(id);
    }
    updateApplicant(data) {
        return this.applicantService.update(data);
    }
    delete(id) {
        return this.applicantService.delete(id);
    }
    async assign(data) {
        const { name, id } = await this.applicantService.assignToUser(data);
        return { name, id };
    }
    async uploadContactForm(data) {
        return this.applicantService.uploadContactForm(data);
    }
    async seedApplicants() {
        return this.applicantService.seedApplicants();
    }
};
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applicant_dto_1.CreateApplicantDTO, Object]),
    __metadata("design:returntype", Promise)
], ApplicantController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "findAll", null);
__decorate([
    common_1.Get('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "findOne", null);
__decorate([
    common_1.Get('/draft/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "draft", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applicant_dto_1.UpdateApplicantDTO]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "updateApplicant", null);
__decorate([
    common_1.Delete('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "delete", null);
__decorate([
    common_1.Post('assign'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applicant_dto_1.AssignApplicantDTO]),
    __metadata("design:returntype", Promise)
], ApplicantController.prototype, "assign", null);
__decorate([
    common_1.Put('/upload'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applicant_dto_1.UploadContactFormDTO]),
    __metadata("design:returntype", Promise)
], ApplicantController.prototype, "uploadContactForm", null);
__decorate([
    common_1.Post('/seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicantController.prototype, "seedApplicants", null);
ApplicantController = __decorate([
    common_1.Controller('api/v3/applicant'),
    __metadata("design:paramtypes", [applicant_service_1.ApplicantService])
], ApplicantController);
exports.ApplicantController = ApplicantController;
//# sourceMappingURL=applicant.controller.js.map