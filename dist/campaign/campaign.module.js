"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const campaign_controller_1 = require("./controllers/campaign.controller");
const endorsement_controller_1 = require("./controllers/endorsement.controller");
const campaign_gateway_1 = require("./gateway/campaign.gateway");
const campaign_resolver_1 = require("./resolvers/campaign.resolver");
const endorsement_resolver_1 = require("./resolvers/endorsement.resolver");
const campaign_schema_1 = require("./schema/campaign.schema");
const endorsement_schema_1 = require("./schema/endorsement.schema");
const campaign_service_1 = require("./services/campaign.service");
const endorsement_service_1 = require("./services/endorsement.service");
const mongooseSlug = require("mongoose-slug-generator");
const user_schema_1 = require("../user/entity/user.schema");
const notification_schema_1 = require("../notification/notification.schema");
let CampaignModule = class CampaignModule {
};
CampaignModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                ,
                { name: endorsement_schema_1.Endorsement.name, schema: endorsement_schema_1.EndorsementSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: notification_schema_1.Notice.name, schema: notification_schema_1.NoticeSchema },
                { name: campaign_schema_1.View.name, schema: campaign_schema_1.ViewSchema },
            ]),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: campaign_schema_1.Campaign.name,
                    useFactory: () => {
                        const schema = campaign_schema_1.CampaignSchema;
                        schema.plugin(mongooseSlug);
                        return schema;
                    },
                },
            ]),
        ],
        providers: [
            campaign_resolver_1.CampaignResolver,
            campaign_service_1.CampaignService,
            endorsement_service_1.EndorsementService,
            endorsement_resolver_1.EndorsementResolver,
            campaign_gateway_1.CampaignGateway,
        ],
        controllers: [campaign_controller_1.CampaignController, endorsement_controller_1.EndorsementController],
    })
], CampaignModule);
exports.CampaignModule = CampaignModule;
//# sourceMappingURL=campaign.module.js.map