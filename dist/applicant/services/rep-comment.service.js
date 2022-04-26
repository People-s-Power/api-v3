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
exports.RepCommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/entity/user.schema");
const connectDb_1 = require("../../utils/connectDb");
const report_schema_1 = require("../schema/report.schema");
const report_service_1 = require("./report.service");
let RepCommentService = class RepCommentService {
    constructor(repCommentModel, reportService) {
        this.repCommentModel = repCommentModel;
        this.reportService = reportService;
    }
    async create(data, user) {
        try {
            const comment = await this.repCommentModel.create(Object.assign(Object.assign({}, data), { author: user.id }));
            await this.reportService.addComment(data.report, comment.id);
            return comment;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const comment = await this.repCommentModel.findById(id);
            if (!comment)
                throw new common_1.NotFoundException('Record not found');
            return comment;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const comment = await this.repCommentModel.findById(id);
            if (!comment)
                throw new common_1.NotFoundException('Record not found');
            await this.reportService.removeComment(comment.report, comment.id);
            comment.remove();
            return comment;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const comment = await this.repCommentModel.findByIdAndUpdate(data.id, data, { new: true });
            return comment;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.repCommentModel.find();
        }
        catch (error) {
            throw error;
        }
    }
    async findByReport(report_id) {
        try {
            return await this.repCommentModel.find({ report: report_id });
        }
        catch (error) {
            throw error;
        }
    }
    async seedRepComment() {
        var _a;
        let fakeRepComments = (await connectDb_1.connectOldDB('repcomments'));
        fakeRepComments = [...fakeRepComments];
        const newRepComment = (_a = fakeRepComments === null || fakeRepComments === void 0 ? void 0 : fakeRepComments.filter((comment) => comment === null || comment === void 0 ? void 0 : comment.report)) === null || _a === void 0 ? void 0 : _a.map((comment) => (Object.assign(Object.assign({}, comment), { content: (comment === null || comment === void 0 ? void 0 : comment.content) || 'no content' })));
        try {
            await this.repCommentModel.deleteMany();
            const reports = await this.repCommentModel.insertMany(newRepComment);
            return reports;
        }
        catch (error) {
            throw error;
        }
    }
};
RepCommentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(report_schema_1.RepComment.name)),
    __param(1, common_1.Inject(common_1.forwardRef(() => report_service_1.ReportService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        report_service_1.ReportService])
], RepCommentService);
exports.RepCommentService = RepCommentService;
//# sourceMappingURL=rep-comment.service.js.map