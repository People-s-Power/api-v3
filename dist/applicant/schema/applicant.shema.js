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
exports.ApplicantSchema = exports.Applicant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/entity/user.schema");
const affidavit_schema_1 = require("./affidavit.schema");
let Applicant = class Applicant {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "image", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "gender", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "state_origin", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "state_residence", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "lga", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "address", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "breach_type", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], Applicant.prototype, "inPrison", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], Applicant.prototype, "daysPlus", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], Applicant.prototype, "monthsPlus", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Applicant.prototype, "arrested_on", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "arrested_at", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "offence_suspected", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Applicant.prototype, "case_mates", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "itinerary", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "station", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "station2", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Applicant.prototype, "station_duration", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Applicant.prototype, "station2_duration", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "state_arrest", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "beaten", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "injured", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Applicant.prototype, "bail_amount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "detention_cost_explained", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "first_accused", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Applicant.prototype, "caseType", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "offence_charged", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Applicant.prototype, "arraigned_on", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "arraigned_at", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "state_arraigned", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Applicant.prototype, "adjournment_date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "dpp", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "charge_no", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "division", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "amount_paid", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Applicant.prototype, "contact_form", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Affidavit' }),
    __metadata("design:type", affidavit_schema_1.Affidavit)
], Applicant.prototype, "affidavit", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Exhibit' }),
    __metadata("design:type", Array)
], Applicant.prototype, "exhibits", void 0);
__decorate([
    mongoose_1.Prop({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Relative' }] }),
    __metadata("design:type", Array)
], Applicant.prototype, "relatives", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Applicant.prototype, "rep", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Applicant.prototype, "lawyer", void 0);
Applicant = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
    })
], Applicant);
exports.Applicant = Applicant;
exports.ApplicantSchema = mongoose_1.SchemaFactory.createForClass(Applicant);
//# sourceMappingURL=applicant.shema.js.map