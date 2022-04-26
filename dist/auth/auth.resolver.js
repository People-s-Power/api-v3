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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_schema_1 = require("../user/entity/user.schema");
const auth_service_1 = require("./auth.service");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    registerWithEmail(input) {
        return this.authService.registerWithEmail(input);
    }
    async loginWithEmail(email, password, phone, req) {
        const user = await this.authService.loginWithEmail(email, phone, password);
        return user;
    }
};
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "registerWithEmail", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('email')),
    __param(1, graphql_1.Args('password')),
    __param(2, graphql_1.Args('phone')),
    __param(3, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginWithEmail", null);
AuthResolver = __decorate([
    graphql_1.Resolver('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map