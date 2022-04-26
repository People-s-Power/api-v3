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
exports.ExhibitController = void 0;
const common_1 = require("@nestjs/common");
const exhibit_dto_1 = require("../dto/exhibit.dto");
const exhibit_service_1 = require("../services/exhibit.service");
let ExhibitController = class ExhibitController {
    constructor(exhibitService) {
        this.exhibitService = exhibitService;
    }
    create(data) {
        return this.exhibitService.create(data);
    }
    findAll() {
        return this.exhibitService.findAll();
    }
    findOne(id) {
        return this.exhibitService.findOne(id);
    }
    update(data) {
        return this.exhibitService.update(data);
    }
    delete(id) {
        return this.exhibitService.deleteOne(id);
    }
    findByApplicant(id) {
        return this.exhibitService.findByApplicant(id);
    }
    seedExhibits() {
        return this.exhibitService.seedExhibits();
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exhibit_dto_1.CreateExhibitDTO]),
    __metadata("design:returntype", void 0)
], ExhibitController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExhibitController.prototype, "findAll", null);
__decorate([
    common_1.Get('single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExhibitController.prototype, "findOne", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exhibit_dto_1.UpdateExhibitDTO]),
    __metadata("design:returntype", void 0)
], ExhibitController.prototype, "update", null);
__decorate([
    common_1.Delete('/single/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExhibitController.prototype, "delete", null);
__decorate([
    common_1.Get('applicant/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExhibitController.prototype, "findByApplicant", null);
__decorate([
    common_1.Post('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExhibitController.prototype, "seedExhibits", null);
ExhibitController = __decorate([
    common_1.Controller('api/v3/exhibit'),
    __metadata("design:paramtypes", [exhibit_service_1.ExhibitService])
], ExhibitController);
exports.ExhibitController = ExhibitController;
//# sourceMappingURL=exhibit.controller.js.map