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
exports.ApplicantService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_dto_1 = require("../../user/dto/user.dto");
const user_schema_1 = require("../../user/entity/user.schema");
const cloudinary_1 = require("../../utils/cloudinary");
const connectDb_1 = require("../../utils/connectDb");
const affidavit_schema_1 = require("../schema/affidavit.schema");
const applicant_shema_1 = require("../schema/applicant.shema");
const report_service_1 = require("./report.service");
let ApplicantService = class ApplicantService {
    constructor(reportService, applicantRepo, userModel, affidavitModel, cacheManager, req) {
        this.reportService = reportService;
        this.applicantRepo = applicantRepo;
        this.userModel = userModel;
        this.affidavitModel = affidavitModel;
        this.cacheManager = cacheManager;
        this.req = req;
    }
    async findAll(user) {
        let applicants = await this.cacheManager.get('applicants');
        try {
            if (!applicants) {
                if ((user === null || user === void 0 ? void 0 : user.role) === user_dto_1.StaffRoleEnum.Supervisor) {
                    applicants = await this.applicantRepo
                        .find({
                        rep: { $in: [...user === null || user === void 0 ? void 0 : user.reps, user === null || user === void 0 ? void 0 : user.id] },
                    })
                        .populate('rep lawyer', 'id firstName lastName')
                        .sort({ createdAt: -1 });
                }
                else if ((user === null || user === void 0 ? void 0 : user.role) === user_dto_1.StaffRoleEnum.Rep ||
                    (user === null || user === void 0 ? void 0 : user.role) === user_dto_1.StaffRoleEnum.Lawyer) {
                    applicants = await this.findByUser(user === null || user === void 0 ? void 0 : user.id);
                }
                else {
                    applicants = await this.applicantRepo
                        .find()
                        .populate('rep lawyer', 'id firstName lastName')
                        .sort({ createdAt: -1 });
                }
                await this.cacheManager.set('applicants', applicants, { ttl: 500 });
            }
            return applicants;
        }
        catch (error) {
            throw error;
        }
    }
    async findByUser(id) {
        try {
            const applicant = await this.applicantRepo
                .find({ $or: [{ rep: id }, { lawyer: id }] })
                .populate('rep lawyer', 'id firstName lastName')
                .sort({ createdAt: -1 });
            return applicant;
        }
        catch (error) {
            throw error;
        }
    }
    async create(data, user) {
        const contact_form = await cloudinary_1.cloudinaryUpload(data.contact_form).catch((err) => {
            throw err;
        });
        if (!user.id)
            throw new common_1.BadRequestException('No user found');
        try {
            const applicant = this.applicantRepo.create(Object.assign(Object.assign({}, data), { contact_form, rep: user.id }));
            return applicant;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const applicant = await this.applicantRepo
                .findById(id)
                .populate('affidavit')
                .populate('relatives');
            if (!applicant)
                throw new common_1.NotFoundException('Record not found');
            return applicant;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const applicant = await this.applicantRepo.findById(id);
            if (!applicant)
                throw new common_1.NotFoundException('Record not found');
            const reports = await this.reportService.findByApplicant(id);
            if (reports.length) {
                reports.forEach(async (report) => await this.reportService.delete(report.id));
            }
            await this.affidavitModel.deleteOne({ applicant: applicant === null || applicant === void 0 ? void 0 : applicant.id });
            applicant.remove();
            return applicant;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const applicant = await this.applicantRepo.findOneAndUpdate({ _id: data.id }, Object.assign({}, data), { new: true });
            return applicant;
        }
        catch (error) {
            throw error;
        }
    }
    async assignToUser(data) {
        const user = await this.userModel.findOne({ _id: data.user_id });
        if (!user)
            throw new common_1.BadRequestException('Invalid user id');
        const assignRep = async () => {
            try {
                const applicant = await this.applicantRepo.findOneAndUpdate({
                    _id: data.applicant_id,
                }, {
                    rep: user.id,
                }, { new: true });
                return applicant;
            }
            catch (error) {
                throw error;
            }
        };
        const assignLawyer = async () => {
            try {
                const applicant = await this.applicantRepo.findOneAndUpdate({
                    _id: data.applicant_id,
                }, {
                    lawyer: user.id,
                }, { new: true });
                return applicant;
            }
            catch (error) {
                throw error;
            }
        };
        if (user.role === user_dto_1.StaffRoleEnum.Rep)
            return await assignRep();
        else if (user.role === user_dto_1.StaffRoleEnum.Lawyer)
            return await assignLawyer();
        else
            throw new common_1.BadRequestException('Sorrry you can only assign a user to rep or lawyer');
    }
    async addAffidavit(applicant_id, affidavit_id) {
        try {
            await this.applicantRepo.findByIdAndUpdate(applicant_id, {
                $set: { affidavit: affidavit_id },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addExhibit(applicant_id, exhibit_id) {
        try {
            await this.applicantRepo.findByIdAndUpdate(applicant_id, {
                $addToSet: { exhibits: exhibit_id },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async removeExhibit(applicant_id, exhibit_id) {
        try {
            await this.applicantRepo.findByIdAndUpdate(applicant_id, {
                $pull: { exhibits: exhibit_id },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addRelative(applicant_id, relative_id) {
        try {
            await this.applicantRepo.findByIdAndUpdate(applicant_id, {
                $addToSet: { relatives: relative_id },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async removeRelative(applicant_id, relative_id) {
        try {
            await this.applicantRepo.findByIdAndUpdate(applicant_id, {
                $pull: { relatives: relative_id },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async uploadContactForm(data) {
        try {
            const contact_form = await cloudinary_1.cloudinaryUpload(data.contact_form).catch((err) => {
                throw err;
            });
            const applicant = await this.applicantRepo.findByIdAndUpdate(data.applicant_id, { $set: { contact_form } });
            return applicant;
        }
        catch (error) {
            throw error;
        }
    }
    async getDraft(applicant_id) {
        try {
            const applicant = await this.findOne(applicant_id);
            const { caseType, affidavit } = applicant;
            if (caseType !== 'A' && !affidavit)
                throw new common_1.NotFoundException('Please add or update the affidavit');
            return applicant;
        }
        catch (error) {
            throw error;
        }
    }
    async countApplicantsByUser(user_id) {
        try {
            const applicantCount = await this.applicantRepo.countDocuments({
                $or: [{ rep: user_id }, { lawyer: user_id }],
            });
            console.log(applicantCount);
            return applicantCount;
        }
        catch (error) {
            throw error;
        }
    }
    async seedApplicants() {
        let fakeApplicants = (await connectDb_1.connectOldDB('applicants'));
        fakeApplicants = [...fakeApplicants];
        const newApplicants = fakeApplicants.map((applicant) => {
            const _id = applicant._id;
            const rep = applicant === null || applicant === void 0 ? void 0 : applicant.rep;
            const lawyer = applicant === null || applicant === void 0 ? void 0 : applicant.lawyer;
            return Object.assign(Object.assign({}, applicant), { _id,
                rep,
                lawyer });
        });
        try {
            await this.applicantRepo.deleteMany();
            const applicants = await this.applicantRepo.insertMany(newApplicants);
            return applicants;
        }
        catch (error) {
            throw error;
        }
    }
};
ApplicantService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel(applicant_shema_1.Applicant.name)),
    __param(2, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(3, mongoose_1.InjectModel(affidavit_schema_1.Affidavit.name)),
    __param(4, common_1.Inject(common_1.CACHE_MANAGER)),
    __param(5, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [report_service_1.ReportService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object, Object])
], ApplicantService);
exports.ApplicantService = ApplicantService;
//# sourceMappingURL=applicant.service.js.map