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
exports.ExhibitService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_1 = require("../../utils/cloudinary");
const connectDb_1 = require("../../utils/connectDb");
const exhibit_schema_1 = require("../schema/exhibit.schema");
let ExhibitService = class ExhibitService {
    constructor(exhibitModel) {
        this.exhibitModel = exhibitModel;
    }
    async create(data) {
        const image = await cloudinary_1.cloudinaryUpload(data.image).catch((err) => {
            throw err;
        });
        try {
            const exhibit = await this.exhibitModel.create(Object.assign(Object.assign({}, data), { image }));
            return exhibit;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const exhibits = await this.exhibitModel.find();
            return exhibits;
        }
        catch (error) {
            throw error;
        }
    }
    async findByApplicant(applicant_id) {
        try {
            const exhibits = await this.exhibitModel.find({ applicant_id });
            return exhibits;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const exhibit = await this.exhibitModel.findById(id);
            return exhibit;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const exhibit = await this.exhibitModel.findByIdAndUpdate(data.id, Object.assign(Object.assign({}, data), { applicant_id: data.applicant_id }), {
                new: true,
            });
            return exhibit;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOne(id) {
        try {
            const exhibit = await this.exhibitModel.findById(id);
            if (!exhibit)
                throw new common_1.NotFoundException('Record not found');
            exhibit.remove();
            return exhibit;
        }
        catch (error) {
            throw error;
        }
    }
    async seedExhibits() {
        const fakeExhibits = (await connectDb_1.connectOldDB('exhibits'));
        const newExhibits = fakeExhibits.map((exhibit) => {
            var _a, _b;
            const image = ((_a = exhibit === null || exhibit === void 0 ? void 0 : exhibit.image) === null || _a === void 0 ? void 0 : _a.includes('https://edfhr-dashboard-724077.us1.kinto.io/uploads/')) || ((_b = exhibit === null || exhibit === void 0 ? void 0 : exhibit.image) === null || _b === void 0 ? void 0 : _b.includes('undefined/upload'))
                ? ' '
                : exhibit === null || exhibit === void 0 ? void 0 : exhibit.image;
            return {
                _id: exhibit._id,
                applicant_id: exhibit === null || exhibit === void 0 ? void 0 : exhibit.applicant_id,
                name: (exhibit === null || exhibit === void 0 ? void 0 : exhibit.name) || 'No name',
                image,
            };
        });
        try {
            await this.exhibitModel.deleteMany();
            return await this.exhibitModel.insertMany(newExhibits);
        }
        catch (error) {
            throw error;
        }
    }
};
ExhibitService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(exhibit_schema_1.Exhibit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ExhibitService);
exports.ExhibitService = ExhibitService;
//# sourceMappingURL=exhibit.service.js.map