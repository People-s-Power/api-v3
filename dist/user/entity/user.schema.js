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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const applicant_shema_1 = require("../../applicant/schema/applicant.shema");
const user_dto_1 = require("../dto/user.dto");
const mongoose_2 = require("mongoose");
let User = class User {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "facebookId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: user_dto_1.AccountTypeEnum,
        default: user_dto_1.AccountTypeEnum.Campaigner,
    }),
    __metadata("design:type", String)
], User.prototype, "accountType", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "otherName", void 0);
__decorate([
    mongoose_1.Prop({ require: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ require: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "emailToken", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: user_dto_1.StaffRoleEnum,
        default: user_dto_1.StaffRoleEnum.User,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    mongoose_1.Prop({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], User.prototype, "reps", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", User)
], User.prototype, "suppervisor", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Applicant' }),
    __metadata("design:type", Array)
], User.prototype, "applicants", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], User.prototype, "reportCount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], User.prototype, "applicantCount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "bankName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "accountNumber", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "accountName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "lastSeen", void 0);
User = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                doc.id = doc._id;
                delete ret._id;
                delete doc._id;
                ret.name = ret.firstName + ' ' + ret.lastName;
                doc.name = doc.firstName + ' ' + doc.lastName;
                return ret;
            },
        },
    })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map