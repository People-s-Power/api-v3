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
exports.RelativeSchema = exports.Relative = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Relative = class Relative {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Relative.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Relative.prototype, "phone", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], Relative.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Applicant' }),
    __metadata("design:type", Object)
], Relative.prototype, "applicant_id", void 0);
Relative = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
    })
], Relative);
exports.Relative = Relative;
exports.RelativeSchema = mongoose_1.SchemaFactory.createForClass(Relative);
//# sourceMappingURL=relative.schema.js.map