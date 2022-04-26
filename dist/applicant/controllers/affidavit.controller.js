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
exports.AffidavitController = void 0;
const common_1 = require("@nestjs/common");
const affidavit_dto_1 = require("../dto/affidavit.dto");
const affidavit_service_1 = require("../services/affidavit.service");
let AffidavitController = class AffidavitController {
    constructor(affidavitService) {
        this.affidavitService = affidavitService;
    }
    findAll() {
        return this.affidavitService.findAll();
    }
    findOne(id) {
        return this.affidavitService.findOne(id);
    }
    create(data) {
        return this.affidavitService.create(data);
    }
    update(data) {
        return this.affidavitService.update(data);
    }
    delete(id) {
        return this.affidavitService.deleteAffidavit(id);
    }
    seedAffidavit() {
        return this.affidavitService.seedAffidavit();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AffidavitController.prototype, "findAll", null);
__decorate([
    common_1.Get('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AffidavitController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affidavit_dto_1.CreateAffidavitDTO]),
    __metadata("design:returntype", void 0)
], AffidavitController.prototype, "create", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affidavit_dto_1.UpdateAffidavitDTO]),
    __metadata("design:returntype", void 0)
], AffidavitController.prototype, "update", null);
__decorate([
    common_1.Delete('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AffidavitController.prototype, "delete", null);
__decorate([
    common_1.Post('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AffidavitController.prototype, "seedAffidavit", null);
AffidavitController = __decorate([
    common_1.Controller('api/v3/affidavit'),
    __metadata("design:paramtypes", [affidavit_service_1.AffidavitService])
], AffidavitController);
exports.AffidavitController = AffidavitController;
//# sourceMappingURL=affidavit.controller.js.map