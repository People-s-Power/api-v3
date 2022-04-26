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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const local_guard_1 = require("../auth/guards/local.guard");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        const users = await this.userService.getUsers();
        const mapped = users.map((user) => {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                accountType: user === null || user === void 0 ? void 0 : user.accountType,
                role: user === null || user === void 0 ? void 0 : user.role,
                isActive: user === null || user === void 0 ? void 0 : user.isActive,
            };
        });
        return mapped;
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    async updateUser(data) {
        const user = await this.userService.updateUser(data);
        return user.id;
    }
    async assign(data) {
        const user = await this.userService.assignUser(data);
        return user.id;
    }
    async changeRole(data) {
        const user = await this.userService.changeRole(data);
        return { id: user.id, role: user.role };
    }
    async changeAccountType(data) {
        const user = await this.userService.accountType(data);
        return { id: user.id, accountType: user.accountType };
    }
    async upload(data, req) {
        const user = await this.userService.uploadImage(data.image, req === null || req === void 0 ? void 0 : req.user);
        return user.image;
    }
    async uploadImage(data) {
        return this.userService.uploadProfileImage(data);
    }
    async activateUser(data) {
        const user = await this.userService.activateUser(data.id);
        return { isActive: user.isActive, id: user.id };
    }
    async deleteUser(id) {
        const user = await this.userService.delete(id);
        return user === null || user === void 0 ? void 0 : user.id;
    }
    async blockUser(data) {
        return await this.userService.blockUser(data.id);
    }
    async seedUser() {
        return await this.userService.seedUsers();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Get('single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Post('assign'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AssignUserAdminDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "assign", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Put('changerole'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ChangeUserRoleDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeRole", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Put('changeaccount'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ChangeUserAccountTypeDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeAccountType", null);
__decorate([
    common_1.UseGuards(local_guard_1.RestAuthGuard),
    common_1.Post('upload'),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "upload", null);
__decorate([
    common_1.Post('image-upload'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadImage", null);
__decorate([
    common_1.Post('activate'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
__decorate([
    common_1.Delete('single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('block'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "blockUser", null);
__decorate([
    common_1.Post('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "seedUser", null);
UserController = __decorate([
    common_1.Controller('api/v3/user'),
    common_1.UseInterceptors(common_1.CacheInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map