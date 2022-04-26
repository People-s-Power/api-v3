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
exports.CampaignSchema = exports.ViewSchema = exports.View = exports.Campaign = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/entity/user.schema");
const campaign_interface_1 = require("../dto/campaign.interface");
let Campaign = class Campaign {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Campaign.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Campaign.prototype, "image", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Campaign.prototype, "aim", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Campaign.prototype, "target", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Campaign.prototype, "body", void 0);
__decorate([
    mongoose_1.Prop({ type: String, slug: 'title' }),
    __metadata("design:type", String)
], Campaign.prototype, "slug", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Campaign.prototype, "excerpt", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: campaign_interface_1.CampaignStatusEnum,
        default: campaign_interface_1.CampaignStatusEnum.Active,
    }),
    __metadata("design:type", String)
], Campaign.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Campaign.prototype, "featured", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User', autopopulate: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "author", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Campaign.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Campaign.prototype, "updatedAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Campaign.prototype, "addedFrom", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Campaign.prototype, "category", void 0);
__decorate([
    mongoose_1.Prop({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'Endorsement', autopopulate: true }],
    }),
    __metadata("design:type", Array)
], Campaign.prototype, "endorsements", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Campaign.prototype, "endorsementCount", void 0);
__decorate([
    mongoose_1.Prop({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User', autopopulate: true }] }),
    __metadata("design:type", Array)
], Campaign.prototype, "likes", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Campaign.prototype, "likeCount", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Campaign.prototype, "promoted", void 0);
__decorate([
    mongoose_1.Prop({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'View', autopopulate: true }],
    }),
    __metadata("design:type", Array)
], Campaign.prototype, "views", void 0);
Campaign = __decorate([
    graphql_1.ObjectType(),
    mongoose_1.Schema({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                doc.id = doc._id;
                delete ret._id;
                delete doc._id;
                return ret;
            },
        },
    })
], Campaign);
exports.Campaign = Campaign;
let View = class View {
};
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], View.prototype, "user", void 0);
View = __decorate([
    mongoose_1.Schema()
], View);
exports.View = View;
exports.ViewSchema = mongoose_1.SchemaFactory.createForClass(View);
exports.CampaignSchema = mongoose_1.SchemaFactory.createForClass(Campaign);
//# sourceMappingURL=campaign.schema.js.map