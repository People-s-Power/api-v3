"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notification_schema_1 = require("./notification.schema");
const notification_service_1 = require("./notification.service");
const notification_controller_1 = require("./notification.controller");
const notification_gateway_1 = require("./notification.gateway");
const report_schema_1 = require("../applicant/schema/report.schema");
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: notification_schema_1.Notice.name, schema: notification_schema_1.NoticeSchema },
                { name: report_schema_1.Report.name, schema: report_schema_1.ReportSchema },
            ]),
        ],
        providers: [notification_service_1.NotificationService, notification_gateway_1.NotificationGateway],
        controllers: [notification_controller_1.NotificationController],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map