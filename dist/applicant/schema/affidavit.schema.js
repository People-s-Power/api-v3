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
exports.AffidavitSchema = exports.Affidavit = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const Mongoose = require("mongoose");
const applicant_shema_1 = require("./applicant.shema");
let Affidavit = class Affidavit {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Affidavit.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Affidavit.prototype, "address", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Affidavit.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Affidavit.prototype, "religion", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Affidavit.prototype, "occupation", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Affidavit.prototype, "rel", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Affidavit.prototype, "gender", void 0);
__decorate([
    mongoose_1.Prop({ type: Mongoose.Types.ObjectId, ref: 'Applicant' }),
    __metadata("design:type", applicant_shema_1.Applicant)
], Affidavit.prototype, "applicant", void 0);
__decorate([
    mongoose_1.Prop({ type: Mongoose.Types.ObjectId, ref: 'Applicant' }),
    __metadata("design:type", applicant_shema_1.Applicant)
], Affidavit.prototype, "applicant_id", void 0);
Affidavit = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete doc.id;
            },
        },
    })
], Affidavit);
exports.Affidavit = Affidavit;
exports.AffidavitSchema = mongoose_1.SchemaFactory.createForClass(Affidavit);
//# sourceMappingURL=affidavit.schema.js.map