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
exports.RepCommentSchema = exports.ReportSchema = exports.RepComment = exports.Report = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/entity/user.schema");
let Report = class Report {
};
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Applicant' }),
    __metadata("design:type", Object)
], Report.prototype, "applicant_id", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Report.prototype, "author", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Report.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], Report.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Report.prototype, "content", void 0);
__decorate([
    mongoose_1.Prop({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'RepComment' }] }),
    __metadata("design:type", Array)
], Report.prototype, "comments", void 0);
Report = __decorate([
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
], Report);
exports.Report = Report;
let RepComment = class RepComment {
};
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Report' }),
    __metadata("design:type", Report)
], RepComment.prototype, "report", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], RepComment.prototype, "author", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], RepComment.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], RepComment.prototype, "content", void 0);
RepComment = __decorate([
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
], RepComment);
exports.RepComment = RepComment;
exports.ReportSchema = mongoose_1.SchemaFactory.createForClass(Report);
exports.RepCommentSchema = mongoose_1.SchemaFactory.createForClass(RepComment);
//# sourceMappingURL=report.schema.js.map