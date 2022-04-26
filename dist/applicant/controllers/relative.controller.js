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
exports.RelativeController = void 0;
const common_1 = require("@nestjs/common");
const relative_dto_1 = require("../dto/relative.dto");
const relative_service_1 = require("../services/relative.service");
let RelativeController = class RelativeController {
    constructor(relativeService) {
        this.relativeService = relativeService;
    }
    create(data) {
        return this.relativeService.create(data);
    }
    update(data) {
        return this.relativeService.update(data);
    }
    delete(id) {
        return this.relativeService.delete(id);
    }
    findAll() {
        return this.relativeService.findAll();
    }
    async findOne(id) {
        return await this.relativeService.findOne(id);
    }
    async findByApplicant(id) {
        return await this.relativeService.findByApplicantId(id);
    }
    async seedRelatives() {
        return this.relativeService.seedRelatives();
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relative_dto_1.CreateRelativeDTO]),
    __metadata("design:returntype", void 0)
], RelativeController.prototype, "create", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relative_dto_1.UpdateRelativeDTO]),
    __metadata("design:returntype", void 0)
], RelativeController.prototype, "update", null);
__decorate([
    common_1.Delete('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelativeController.prototype, "delete", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelativeController.prototype, "findAll", null);
__decorate([
    common_1.Get('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RelativeController.prototype, "findOne", null);
__decorate([
    common_1.Get('/applicant/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RelativeController.prototype, "findByApplicant", null);
__decorate([
    common_1.Post('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RelativeController.prototype, "seedRelatives", null);
RelativeController = __decorate([
    common_1.Controller('api/v3/relative'),
    __metadata("design:paramtypes", [relative_service_1.RelativeService])
], RelativeController);
exports.RelativeController = RelativeController;
//# sourceMappingURL=relative.controller.js.map