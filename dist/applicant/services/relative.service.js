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
exports.RelativeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const connectDb_1 = require("../../utils/connectDb");
const relative_schema_1 = require("../schema/relative.schema");
const applicant_service_1 = require("./applicant.service");
let RelativeService = class RelativeService {
    constructor(relativeModel, applicantService) {
        this.relativeModel = relativeModel;
        this.applicantService = applicantService;
    }
    async create(data) {
        if (!data.applicant_id)
            throw new Error('Please add the applicant_id');
        try {
            const relative = await this.relativeModel.create(data);
            await this.applicantService.addRelative(data.applicant_id, relative.id);
            return relative;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const relative = await this.relativeModel.findByIdAndUpdate(data.id, Object.assign(Object.assign({}, data), { applicant_id: data.id }), { new: true });
            return relative;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const relative = await this.relativeModel.findById(id);
            if (!relative)
                throw new common_1.NotFoundException('Record not found');
            await this.applicantService.removeRelative(relative.applicant_id, relative.id);
            relative.remove();
            return relative;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.relativeModel.find();
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const relative = await this.relativeModel.findById(id);
            if (!relative)
                throw new common_1.NotFoundException('Record not found');
            console.log(relative);
            return relative;
        }
        catch (error) {
            throw error;
        }
    }
    async findByApplicantId(applicant_id) {
        try {
            return await this.relativeModel.find({ applicant_id });
        }
        catch (error) {
            throw error;
        }
    }
    async seedRelatives() {
        let fakeRelatives = await connectDb_1.connectOldDB('relatives');
        fakeRelatives = [...fakeRelatives];
        const newRelatives = fakeRelatives.map((relative) => {
            return Object.assign(Object.assign({}, relative), { applicant_id: relative === null || relative === void 0 ? void 0 : relative.applicant_id, phone: (relative === null || relative === void 0 ? void 0 : relative.phone) || '00000000000', email: (relative === null || relative === void 0 ? void 0 : relative.email) || '', name: (relative === null || relative === void 0 ? void 0 : relative.name) || 'no name' });
        });
        try {
            await this.relativeModel.deleteMany();
            return await this.relativeModel.insertMany(newRelatives);
        }
        catch (error) {
            throw error;
        }
    }
};
RelativeService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(relative_schema_1.Relative.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        applicant_service_1.ApplicantService])
], RelativeService);
exports.RelativeService = RelativeService;
//# sourceMappingURL=relative.service.js.map