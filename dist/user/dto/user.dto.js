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
exports.ChangePasswordDTO = exports.ChangeUserAccountTypeDTO = exports.ChangeUserRoleDTO = exports.AssignUserAdminDTO = exports.UpdateUserDTO = exports.LoginWithGoogleDTO = exports.LoginWithEmailDTO = exports.RegisterWithGoogleDTO = exports.RegisterWithEmailDTO = exports.IUser = exports.AccountTypeEnum = exports.StaffRoleEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const applicant_shema_1 = require("../../applicant/schema/applicant.shema");
const interfaces_1 = require("../../interfaces");
var StaffRoleEnum;
(function (StaffRoleEnum) {
    StaffRoleEnum["Admin"] = "Admin";
    StaffRoleEnum["Rep"] = "Rep";
    StaffRoleEnum["LegalWorld"] = "LegalWorld";
    StaffRoleEnum["Lawyer"] = "Lawyer";
    StaffRoleEnum["Draft"] = "Draft";
    StaffRoleEnum["Supervisor"] = "Supervisor";
    StaffRoleEnum["Campaigner"] = "Campaigner";
    StaffRoleEnum["User"] = "User";
})(StaffRoleEnum = exports.StaffRoleEnum || (exports.StaffRoleEnum = {}));
var AccountTypeEnum;
(function (AccountTypeEnum) {
    AccountTypeEnum["Campaigner"] = "Campaigner";
    AccountTypeEnum["Staff"] = "Staff";
    AccountTypeEnum["Applicant"] = "Applicant";
    AccountTypeEnum["Contact"] = "Contact";
})(AccountTypeEnum = exports.AccountTypeEnum || (exports.AccountTypeEnum = {}));
class IUser extends mongoose_1.Document {
}
exports.IUser = IUser;
class RegisterWithEmailDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "image", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "otherName", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "country", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], RegisterWithEmailDTO.prototype, "city", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], RegisterWithEmailDTO.prototype, "location", void 0);
exports.RegisterWithEmailDTO = RegisterWithEmailDTO;
class RegisterWithGoogleDTO extends swagger_1.PartialType(RegisterWithEmailDTO) {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterWithGoogleDTO.prototype, "googleId", void 0);
exports.RegisterWithGoogleDTO = RegisterWithGoogleDTO;
class LoginWithEmailDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LoginWithEmailDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LoginWithEmailDTO.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LoginWithEmailDTO.prototype, "password", void 0);
exports.LoginWithEmailDTO = LoginWithEmailDTO;
class LoginWithGoogleDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LoginWithGoogleDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LoginWithGoogleDTO.prototype, "googleId", void 0);
exports.LoginWithGoogleDTO = LoginWithGoogleDTO;
class UpdateUserDTO {
}
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "image", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "otherName", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "bankName", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "accountNumber", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "accountName", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "country", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "city", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
class AssignUserAdminDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AssignUserAdminDTO.prototype, "user_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AssignUserAdminDTO.prototype, "admin_id", void 0);
exports.AssignUserAdminDTO = AssignUserAdminDTO;
class ChangeUserRoleDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangeUserRoleDTO.prototype, "user_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangeUserRoleDTO.prototype, "role", void 0);
exports.ChangeUserRoleDTO = ChangeUserRoleDTO;
class ChangeUserAccountTypeDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangeUserAccountTypeDTO.prototype, "user_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangeUserAccountTypeDTO.prototype, "accountType", void 0);
exports.ChangeUserAccountTypeDTO = ChangeUserAccountTypeDTO;
class ChangePasswordDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "oldPassword", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "newPassword", void 0);
exports.ChangePasswordDTO = ChangePasswordDTO;
//# sourceMappingURL=user.dto.js.map