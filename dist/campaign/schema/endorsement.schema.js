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
exports.EndorsementSchema = exports.Endorsement = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/entity/user.schema");
let Endorsement = class Endorsement {
};
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Endorsement.prototype, "author", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Campaign' }),
    __metadata("design:type", Object)
], Endorsement.prototype, "campaign", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Array)
], Endorsement.prototype, "likes", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Endorsement.prototype, "body", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Endorsement.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Endorsement.prototype, "updatedAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Endorsement.prototype, "likeCount", void 0);
Endorsement = __decorate([
    graphql_1.ObjectType(),
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
], Endorsement);
exports.Endorsement = Endorsement;
exports.EndorsementSchema = mongoose_1.SchemaFactory.createForClass(Endorsement);
//# sourceMappingURL=endorsement.schema.js.map