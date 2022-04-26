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
exports.EnvService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_dto_1 = require("../user/dto/user.dto");
const user_schema_1 = require("../user/entity/user.schema");
const env_schema_1 = require("./env.schema");
let EnvService = class EnvService {
    constructor(envModel) {
        this.envModel = envModel;
    }
    async createEnv(data) {
        try {
            const env = await this.envModel.create(data);
            return env;
        }
        catch (error) {
            throw error;
        }
    }
    async updateEnv(data, user) {
        if (user.role !== user_dto_1.StaffRoleEnum.Admin)
            throw new common_1.UnauthorizedException();
        try {
            const env = await this.envModel.findByIdAndUpdate(data.id, data, {
                new: true,
            });
            return env;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteEnv(id, user) {
        if (user.role !== user_dto_1.StaffRoleEnum.Admin)
            throw new common_1.UnauthorizedException("You can't delete this");
        try {
            const env = await this.envModel.findByIdAndDelete(id);
            return env;
        }
        catch (error) {
            throw error;
        }
    }
    async getEnvs() {
        try {
            const envs = await this.envModel.find();
            return envs.filter((e) => !e.isPrivate);
        }
        catch (error) {
            throw error;
        }
    }
    async getEnv(id) {
        try {
            const envs = await this.envModel.findById(id);
            return envs;
        }
        catch (error) {
            throw error;
        }
    }
};
EnvService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(env_schema_1.Env.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EnvService);
exports.EnvService = EnvService;
//# sourceMappingURL=env.service.js.map