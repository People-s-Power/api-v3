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
exports.EnvResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../auth/guards/graphql.guard");
const user_schema_1 = require("../user/entity/user.schema");
const env_service_1 = require("./env.service");
let EnvResolver = class EnvResolver {
    constructor(envService) {
        this.envService = envService;
    }
    getEnvs() {
        return this.envService.getEnvs();
    }
    getEnv(id) {
        return this.envService.getEnv(id);
    }
    createEnv(input) {
        return this.envService.createEnv(input);
    }
    updateEnv(input, user) {
        return this.envService.updateEnv(input, user);
    }
    deleteEnv(id, user) {
        return this.envService.deleteEnv(id, user);
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnvResolver.prototype, "getEnvs", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvResolver.prototype, "getEnv", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnvResolver.prototype, "createEnv", null);
__decorate([
    common_1.UseGuards(graphql_guard_1.GQLGuard),
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __param(1, graphql_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EnvResolver.prototype, "updateEnv", null);
__decorate([
    common_1.UseGuards(graphql_guard_1.GQLGuard),
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EnvResolver.prototype, "deleteEnv", null);
EnvResolver = __decorate([
    graphql_1.Resolver('Env'),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], EnvResolver);
exports.EnvResolver = EnvResolver;
//# sourceMappingURL=env.resolver.js.map