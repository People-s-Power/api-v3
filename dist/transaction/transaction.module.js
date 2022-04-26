"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const applicant_shema_1 = require("../applicant/schema/applicant.shema");
const campaign_schema_1 = require("../campaign/schema/campaign.schema");
const transaction_controller_1 = require("./transaction.controller");
const transaction_schema_1 = require("./transaction.schema");
const transaction_service_1 = require("./transaction.service");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: transaction_schema_1.Transaction.name, schema: transaction_schema_1.TransactionSchema },
                { name: campaign_schema_1.Campaign.name, schema: campaign_schema_1.CampaignSchema },
                { name: applicant_shema_1.Applicant.name, schema: applicant_shema_1.ApplicantSchema },
            ]),
        ],
        controllers: [transaction_controller_1.TransactionController],
        providers: [transaction_service_1.TransactionService],
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map