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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const applicant_shema_1 = require("../applicant/schema/applicant.shema");
const cloudinary_1 = require("../utils/cloudinary");
const connectDb_1 = require("../utils/connectDb");
const user_dto_1 = require("./dto/user.dto");
const user_schema_1 = require("./entity/user.schema");
let UserService = class UserService {
    constructor(cacheManager, userModel, applicantModel) {
        this.cacheManager = cacheManager;
        this.userModel = userModel;
        this.applicantModel = applicantModel;
    }
    async getUsers(accountType, role, user) {
        let data = await this.cacheManager.get('users');
        if (!data) {
            if ((user === null || user === void 0 ? void 0 : user.role) === user_dto_1.StaffRoleEnum.Supervisor) {
                data = await this.userModel
                    .find({ suppervisor: user === null || user === void 0 ? void 0 : user.id })
                    .select('-password')
                    .sort({ createdAt: -1 })
                    .catch((err) => {
                    throw err;
                });
            }
            else {
                data = await this.userModel
                    .find()
                    .select('-password')
                    .sort({ createdAt: -1 })
                    .catch((err) => {
                    throw err;
                });
            }
        }
        await this.cacheManager.set('users', data);
        try {
            const users = data.map((user) => {
                const count = new Promise((resolve) => {
                    resolve(this.applicantModel.countDocuments({
                        $or: [{ rep: user === null || user === void 0 ? void 0 : user.id }, { lawyer: user === null || user === void 0 ? void 0 : user.id }],
                    }));
                });
                const payload = Object.assign(Object.assign({}, user._doc), { id: user._id, applicantCount: count });
                return payload;
            });
            if (accountType)
                return users.filter((user) => user.accountType === accountType);
            if (role)
                return users
                    .filter((user) => user.role === role)
                    .sort((a, b) => {
                    if (a.applicantCount > b.applicantCount)
                        return 0;
                    else if (a.applicantCount < b.applicantCount)
                        return 1;
                    return -1;
                });
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const user = await this.userModel
                .findById(id)
                .populate('reps', 'firstName lastName id')
                .select('-password');
            if (!user)
                throw new common_1.NotFoundException('No user found');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async uploadProfileImage(data) {
        try {
            const image = await cloudinary_1.cloudinaryUpload(data.image);
            const user = await this.userModel.findByIdAndUpdate(data.id, { $set: { image } }, { new: true });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const user = await this.userModel.findById(id).select('-password');
            if (!user)
                throw new common_1.NotFoundException('User record not found');
            const applicants = await this.applicantModel.find({
                $or: [{ rep: id }, { lawyer: id }],
            });
            if (applicants.length)
                throw new common_1.BadRequestException('Unable to delete user, user has contacts associated with it');
            user.remove();
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteMany() {
        try {
            const users = await this.userModel.find();
            users.forEach((user) => user.remove());
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async assignUser(data) {
        if (!data.user_id || !data.admin_id)
            throw new common_1.BadRequestException('Provide a user_id and admin_id');
        await this.userModel.findOneAndUpdate({ reps: data === null || data === void 0 ? void 0 : data.user_id }, { $pull: { reps: data === null || data === void 0 ? void 0 : data.user_id } }, { new: true });
        try {
            const user = await this.userModel.findOneAndUpdate({ _id: data.admin_id }, { $addToSet: { reps: data.user_id } }, { new: true });
            await this.userModel.findByIdAndUpdate(data === null || data === void 0 ? void 0 : data.user_id, {
                $set: { suppervisor: data === null || data === void 0 ? void 0 : data.admin_id },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async changeRole(data) {
        const { user_id, role } = data;
        try {
            const user = await this.userModel.findOneAndUpdate({ _id: user_id }, { $set: { role: role } }, { new: true });
            return user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async accountType(data) {
        const { user_id, accountType } = data;
        try {
            const user = await this.userModel.findOneAndUpdate({ _id: user_id }, { $set: { accountType: accountType } }, { new: true });
            return user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateUser(data) {
        try {
            const user = await this.userModel.findByIdAndUpdate(data.id, Object.assign({}, data), {
                new: true,
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async uploadImage(file, user) {
        const image = await cloudinary_1.cloudinaryUpload(file).catch((err) => {
            console.log(err);
            throw new Error('Problem with uploading image');
        });
        try {
            const data = await this.userModel.findByIdAndUpdate(user.id, {
                $set: { image },
            }, { new: true });
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async activateUser(user_id) {
        let user = await this.userModel.findById(user_id);
        if (user === null || user === void 0 ? void 0 : user.isActive)
            return this.blockUser(user_id);
        try {
            user = await this.userModel.findById(user_id).select('-password');
            await this.userModel.updateOne({ _id: user_id }, { $set: { isActive: true } }, { new: true });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async blockUser(user_id) {
        try {
            const user = await this.userModel.findById(user_id).select('-password');
            await this.userModel.updateOne({ _id: user_id }, { $set: { isActive: false } }, { new: true });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async seedUsers() {
        const users = await connectDb_1.connectOldDB('users');
        const fakeUsers = [...users];
        const newUsers = fakeUsers === null || fakeUsers === void 0 ? void 0 : fakeUsers.map((user) => {
            const firstName = user === null || user === void 0 ? void 0 : user.name.split(' ')[0];
            const lastName = user === null || user === void 0 ? void 0 : user.name.split(' ')[1];
            const accountType = user_dto_1.AccountTypeEnum.Staff;
            const role = user.position === user_dto_1.StaffRoleEnum[user === null || user === void 0 ? void 0 : user.position]
                ? user === null || user === void 0 ? void 0 : user.position
                : user_dto_1.StaffRoleEnum.User;
            const country = 'Nigeria';
            const _id = user._id;
            const admin = user === null || user === void 0 ? void 0 : user.admin;
            const updatedAt = user === null || user === void 0 ? void 0 : user.updatedAt;
            const image = (user === null || user === void 0 ? void 0 : user.image.includes('https://edfhr-dashboard-724077.us1.kinto.io/')) ||
                (user === null || user === void 0 ? void 0 : user.image.includes('https://gravatar.com/avatar')) ||
                (user === null || user === void 0 ? void 0 : user.image.includes('undefined/uploads'))
                ? ''
                : user === null || user === void 0 ? void 0 : user.image;
            return Object.assign(Object.assign({}, user), { _id,
                admin,
                firstName,
                lastName,
                accountType,
                role,
                country,
                updatedAt,
                image });
        });
        const findDuplicates = (arr) => {
            var _a;
            const sortedArray = arr.slice().sort();
            const results = [];
            const duplicates = [];
            for (let i = 0; i < sortedArray.length - 1; i++) {
                const dup = results.find((res) => res.email === sortedArray[i].email);
                if ((dup === null || dup === void 0 ? void 0 : dup.email) === ((_a = sortedArray[i]) === null || _a === void 0 ? void 0 : _a.email)) {
                    duplicates.push(sortedArray[i]);
                }
                else {
                    results.push(sortedArray[i]);
                }
            }
            return results;
        };
        try {
            const filtered = findDuplicates(newUsers);
            await this.userModel.deleteMany();
            const users = await this.userModel.insertMany(filtered);
            return users;
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.CACHE_MANAGER)),
    __param(1, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(2, mongoose_1.InjectModel(applicant_shema_1.Applicant.name)),
    __metadata("design:paramtypes", [Object, mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map