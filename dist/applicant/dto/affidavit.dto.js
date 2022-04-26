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
exports.UpdateAffidavitDTO = exports.CreateAffidavitDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateAffidavitDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateAffidavitDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateAffidavitDTO.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateAffidavitDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateAffidavitDTO.prototype, "religion", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateAffidavitDTO.prototype, "occupation", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateAffidavitDTO.prototype, "rel", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateAffidavitDTO.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], CreateAffidavitDTO.prototype, "applicant", void 0);
exports.CreateAffidavitDTO = CreateAffidavitDTO;
class UpdateAffidavitDTO extends swagger_1.PartialType(CreateAffidavitDTO) {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateAffidavitDTO.prototype, "id", void 0);
exports.UpdateAffidavitDTO = UpdateAffidavitDTO;
//# sourceMappingURL=affidavit.dto.js.map