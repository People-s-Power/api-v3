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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const local_guard_1 = require("../../auth/guards/local.guard");
const report_dto_1 = require("../dto/report.dto");
const report_service_1 = require("../services/report.service");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    findAll() {
        return this.reportService.findAll();
    }
    findOne(id) {
        return this.reportService.findOne(id);
    }
    findByApplicant(id) {
        return this.reportService.findByApplicant(id);
    }
    delete(id) {
        return this.reportService.delete(id);
    }
    create(data, req) {
        return this.reportService.create(data, req.user);
    }
    update(data) {
        return this.reportService.update(data);
    }
    async seed() {
        return await this.reportService.seedReport();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "findAll", null);
__decorate([
    common_1.Get('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "findOne", null);
__decorate([
    common_1.Get('/applicant/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "findByApplicant", null);
__decorate([
    common_1.Delete('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "delete", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.CreateReportDTO, Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "create", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.UpdateReportDTO]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "update", null);
__decorate([
    common_1.Post('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "seed", null);
ReportController = __decorate([
    common_1.Controller('api/v3/report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map