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
exports.TransactionSchema = exports.Transaction = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/entity/user.schema");
const transaction_interface_1 = require("./transaction.interface");
let Transaction = class Transaction {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Transaction.prototype, "message", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Transaction.prototype, "reference", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Transaction.prototype, "transaction", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Transaction.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Transaction.prototype, "transactionId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Transaction.prototype, "paid_at", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Transaction.prototype, "created_at", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Transaction.prototype, "channel", void 0);
__decorate([
    mongoose_1.Prop({ type: String, enum: transaction_interface_1.PaymentPurposeEnum }),
    __metadata("design:type", String)
], Transaction.prototype, "purpose", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Transaction.prototype, "key", void 0);
Transaction = __decorate([
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
], Transaction);
exports.Transaction = Transaction;
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);
//# sourceMappingURL=transaction.schema.js.map