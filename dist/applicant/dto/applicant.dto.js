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
exports.UploadContactFormDTO = exports.ApplicantAddAffidavit = exports.AssignApplicantDTO = exports.UpdateApplicantDTO = exports.CreateApplicantDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateApplicantDTO {
}
__decorate([
    swagger_1.ApiProperty({}),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "state_origin", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "state_residence", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "lga", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "breach_type", void 0);
__decorate([
    swagger_1.ApiProperty({ default: false }),
    __metadata("design:type", Boolean)
], CreateApplicantDTO.prototype, "inPrison", void 0);
__decorate([
    swagger_1.ApiProperty({ default: false }),
    __metadata("design:type", Boolean)
], CreateApplicantDTO.prototype, "daysPlus", void 0);
__decorate([
    swagger_1.ApiProperty({ default: false }),
    __metadata("design:type", Boolean)
], CreateApplicantDTO.prototype, "monthsPlus", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], CreateApplicantDTO.prototype, "arrested_on", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "arrested_at", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "offence_suspected", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], CreateApplicantDTO.prototype, "case_mates", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "itinerary", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "station", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "station2", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateApplicantDTO.prototype, "station_duration", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], CreateApplicantDTO.prototype, "station2_duration", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "state_arrest", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "beaten", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "injured", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", Number)
], CreateApplicantDTO.prototype, "bail_amount", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "detention_cost_explained", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "first_accused", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "offence_charged", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", Date)
], CreateApplicantDTO.prototype, "arraigned_on", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "state_arraigned", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", Date)
], CreateApplicantDTO.prototype, "adjournment_date", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "dpp", void 0);
__decorate([
    swagger_1.ApiProperty({ nullable: true }),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "division", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateApplicantDTO.prototype, "contact_form", void 0);
exports.CreateApplicantDTO = CreateApplicantDTO;
class UpdateApplicantDTO extends swagger_1.PartialType(CreateApplicantDTO) {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateApplicantDTO.prototype, "id", void 0);
exports.UpdateApplicantDTO = UpdateApplicantDTO;
class AssignApplicantDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AssignApplicantDTO.prototype, "applicant_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AssignApplicantDTO.prototype, "user_id", void 0);
exports.AssignApplicantDTO = AssignApplicantDTO;
class ApplicantAddAffidavit {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ApplicantAddAffidavit.prototype, "applicant_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ApplicantAddAffidavit.prototype, "affidavit", void 0);
exports.ApplicantAddAffidavit = ApplicantAddAffidavit;
class UploadContactFormDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UploadContactFormDTO.prototype, "applicant_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UploadContactFormDTO.prototype, "contact_form", void 0);
exports.UploadContactFormDTO = UploadContactFormDTO;
//# sourceMappingURL=applicant.dto.js.map