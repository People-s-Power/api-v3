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
exports.RepCommentController = void 0;
const common_1 = require("@nestjs/common");
const local_guard_1 = require("../../auth/guards/local.guard");
const report_dto_1 = require("../dto/report.dto");
const rep_comment_service_1 = require("../services/rep-comment.service");
let RepCommentController = class RepCommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(data, req) {
        return this.commentService.create(data, req.user);
    }
    update(data) {
        return this.commentService.update(data);
    }
    findAll() {
        return this.commentService.findAll();
    }
    findByReport(id) {
        return this.commentService.findByReport(id);
    }
    findOne(id) {
        return this.commentService.findOne(id);
    }
    delete(id) {
        return this.commentService.delete(id);
    }
    async seed() {
        return await this.commentService.seedRepComment();
    }
};
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.CreateRepCommentDTO, Object]),
    __metadata("design:returntype", void 0)
], RepCommentController.prototype, "create", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Put(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.UpdateRepCommentDTO]),
    __metadata("design:returntype", void 0)
], RepCommentController.prototype, "update", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RepCommentController.prototype, "findAll", null);
__decorate([
    common_1.Get('report/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepCommentController.prototype, "findByReport", null);
__decorate([
    common_1.Get('single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepCommentController.prototype, "findOne", null);
__decorate([
    common_1.Delete('single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepCommentController.prototype, "delete", null);
__decorate([
    common_1.Post('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RepCommentController.prototype, "seed", null);
RepCommentController = __decorate([
    common_1.Controller('api/v3/rep-comment'),
    __metadata("design:paramtypes", [rep_comment_service_1.RepCommentService])
], RepCommentController);
exports.RepCommentController = RepCommentController;
//# sourceMappingURL=rep-comment.controller.js.map