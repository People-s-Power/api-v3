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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const applicant_service_1 = require("../applicant/services/applicant.service");
const graphql_guard_1 = require("../auth/guards/graphql.guard");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService, applicantService) {
        this.userService = userService;
        this.applicantService = applicantService;
    }
    async getUsers(user, role, accountType) {
        return await this.userService.getUsers(accountType, role, user);
    }
    async deleteUser(id) {
        return await this.userService.delete(id);
    }
    async deleteManyUser() {
        return await this.userService.deleteMany();
    }
    async getUser(id) {
        return await this.userService.findOne(id);
    }
    async getUserApplicants(id) {
        return await this.applicantService.findByUser(id);
    }
    async seedUsers() {
        return await this.userService.seedUsers();
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_guard_1.CurrentUser()),
    __param(1, graphql_1.Args('role')),
    __param(2, graphql_1.Args('accountType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteManyUser", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserApplicants", null);
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "seedUsers", null);
UserResolver = __decorate([
    graphql_1.Resolver('User'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        applicant_service_1.ApplicantService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map