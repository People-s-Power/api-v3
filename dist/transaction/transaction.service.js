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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("axios");
const mongoose_2 = require("mongoose");
const campaign_schema_1 = require("../campaign/schema/campaign.schema");
const config_1 = require("../utils/config");
const transaction_interface_1 = require("./transaction.interface");
const transaction_schema_1 = require("./transaction.schema");
let TransactionService = class TransactionService {
    constructor(transactionModel, campaignModel) {
        this.transactionModel = transactionModel;
        this.campaignModel = campaignModel;
    }
    async webhook(e) {
        var _a, _b;
        try {
            const transaction = await this.transactionModel.create(Object.assign(Object.assign({}, e.data), { transactionId: e.data.id, purpose: (_a = e.data.metadata) === null || _a === void 0 ? void 0 : _a.purpose, key: (_b = e.data.metadata) === null || _b === void 0 ? void 0 : _b.key }));
            if (transaction.purpose === transaction_interface_1.PaymentPurposeEnum.CAMPAIGN) {
                await this.campaignModel
                    .findByIdAndUpdate(transaction.key, {
                    $set: { promoted: true },
                }, { new: true })
                    .catch((e) => {
                    throw e;
                });
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyPayment(reference) {
        var _a, _b;
        try {
            const { data } = await axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${config_1.default.PAYSTACK_SK}`,
                },
            });
            const res = data;
            const transaction = await this.transactionModel.create(Object.assign(Object.assign({}, res.data), { transactionId: res.data.id, purpose: (_a = res.data.metadata) === null || _a === void 0 ? void 0 : _a.purpose, key: (_b = res.data.metadata) === null || _b === void 0 ? void 0 : _b.key }));
            if (transaction.purpose === transaction_interface_1.PaymentPurposeEnum.CAMPAIGN) {
                await this.campaignModel
                    .findByIdAndUpdate(transaction.key, {
                    $set: { promoted: true },
                }, { new: true })
                    .catch((e) => {
                    throw e;
                });
            }
            return transaction;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
TransactionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(transaction_schema_1.Transaction.name)),
    __param(1, mongoose_1.InjectModel(campaign_schema_1.Campaign.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map