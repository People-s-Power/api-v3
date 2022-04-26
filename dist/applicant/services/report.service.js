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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/entity/user.schema");
const connectDb_1 = require("../../utils/connectDb");
const report_schema_1 = require("../schema/report.schema");
const rep_comment_service_1 = require("./rep-comment.service");
let ReportService = class ReportService {
    constructor(reportModel, commentService) {
        this.reportModel = reportModel;
        this.commentService = commentService;
    }
    async create(data, user) {
        try {
            let report = await this.reportModel.create(Object.assign(Object.assign({}, data), { author: user.id }));
            report = await this.reportModel
                .findById(report.id)
                .populate('author', 'id firstName lastName image');
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const reports = await this.reportModel
                .find()
                .populate('applicant_id', 'id name')
                .populate('comments');
            return reports;
        }
        catch (error) {
            throw error;
        }
    }
    async findByApplicant(applicant_id) {
        try {
            const reports = await this.reportModel
                .find({ applicant_id })
                .sort({ createdAt: -1 })
                .populate('applicant_id', 'id name')
                .populate('comments')
                .populate('author', 'id firstName lastName image');
            return reports;
        }
        catch (error) {
            throw error;
        }
    }
    async findByUser(user_id) {
        try {
            const reports = await this.reportModel
                .find({ author: user_id })
                .populate('applicant_id', 'id name')
                .populate('author', 'id firstName lastName image');
            return reports;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const report = await this.reportModel
                .findById(id)
                .populate('author', 'id firstName lastName image role')
                .populate('comments');
            if (!report)
                throw new common_1.NotFoundException();
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const report = await this.reportModel.findByIdAndUpdate(data.id, data, {
                new: true,
            });
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const report = await this.reportModel.findById(id);
            if (!report)
                throw new common_1.NotFoundException();
            const comments = await this.commentService.findByReport(id);
            if (comments.length) {
                comments.forEach(async (comment) => await this.commentService.delete(comment.id));
            }
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteMany(query) {
        try {
            const res = await this.reportModel.find(query);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async addComment(report_id, comment_id) {
        try {
            const report = await this.reportModel.findByIdAndUpdate(report_id, { $addToSet: { comments: comment_id } }, { new: true });
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async removeComment(report_id, comment_id) {
        try {
            const report = await this.reportModel.findByIdAndUpdate(report_id, { $pull: { comments: comment_id } }, { new: true });
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async seedReport() {
        let fakeReports = (await connectDb_1.connectOldDB('reports'));
        fakeReports = [...fakeReports];
        const newReports = fakeReports === null || fakeReports === void 0 ? void 0 : fakeReports.map((report) => (Object.assign(Object.assign({}, report), { applicant_id: report === null || report === void 0 ? void 0 : report.applicant_id })));
        try {
            await this.reportModel.deleteMany();
            const reports = await this.reportModel.insertMany(newReports);
            return reports;
        }
        catch (error) {
            throw error;
        }
    }
};
ReportService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(report_schema_1.Report.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        rep_comment_service_1.RepCommentService])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map