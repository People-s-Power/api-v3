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
exports.AffidavitService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const connectDb_1 = require("../../utils/connectDb");
const affidavit_schema_1 = require("../schema/affidavit.schema");
const applicant_shema_1 = require("../schema/applicant.shema");
let AffidavitService = class AffidavitService {
    constructor(affidavitRepo, applicantModel) {
        this.affidavitRepo = affidavitRepo;
        this.applicantModel = applicantModel;
    }
    async findAll() {
        try {
            const affidavits = await this.affidavitRepo
                .find()
                .populate('applicant', 'id name');
            return affidavits;
        }
        catch (error) {
            throw error;
        }
    }
    async findByApplicant(applicant_id) {
        try {
            const affidavits = await this.affidavitRepo.findOne({
                applicant: applicant_id,
            });
            return affidavits;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const affidavit = await this.affidavitRepo.findById(id);
            return affidavit;
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        let affidavit = await this.affidavitRepo.findOne({
            applicant: data.applicant,
        });
        if (affidavit)
            return await this.update(data);
        try {
            affidavit = await this.affidavitRepo.create(data);
            await this.applicantModel.findByIdAndUpdate(data.applicant, { affidavit: affidavit === null || affidavit === void 0 ? void 0 : affidavit.id }, { new: true });
            return affidavit;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const affidavit = await this.affidavitRepo.findByIdAndUpdate(data.id, Object.assign(Object.assign({}, data), { applicant: data.applicant }), { new: true });
            return affidavit;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAffidavit(id) {
        try {
            const affidavit = await this.affidavitRepo.findById(id);
            if (!affidavit)
                throw new common_1.NotFoundException('Record not found');
            affidavit.remove();
            return affidavit;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAllAffidavitWithoutApplicants() {
        try {
            const result = await this.affidavitRepo.find({
                applicant_id: { $exists: false },
            });
            result === null || result === void 0 ? void 0 : result.forEach((r) => r.remove());
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async seedAffidavit() {
        let fakeAffidavits = (await connectDb_1.connectOldDB('affidavits'));
        fakeAffidavits = [...fakeAffidavits];
        const newAffidavit = fakeAffidavits.map((affidavit) => {
            const _id = affidavit === null || affidavit === void 0 ? void 0 : affidavit._id;
            const applicant = affidavit === null || affidavit === void 0 ? void 0 : affidavit.applicant_id;
            const applicant_id = affidavit === null || affidavit === void 0 ? void 0 : affidavit.applicant_id;
            return Object.assign(Object.assign({}, affidavit), { _id,
                applicant_id,
                applicant });
        });
        try {
            await this.affidavitRepo.deleteMany();
            const affidavits = await this.affidavitRepo.insertMany(newAffidavit);
            return affidavits;
        }
        catch (error) {
            throw error;
        }
    }
};
AffidavitService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(affidavit_schema_1.Affidavit.name)),
    __param(1, mongoose_1.InjectModel(applicant_shema_1.Applicant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AffidavitService);
exports.AffidavitService = AffidavitService;
//# sourceMappingURL=affidavit.service.js.map