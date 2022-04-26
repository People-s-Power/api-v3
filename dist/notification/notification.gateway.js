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
exports.NotificationGateway = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const websockets_1 = require("@nestjs/websockets");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./notification.schema");
const ws_1 = require("ws");
let NotificationGateway = class NotificationGateway {
    constructor(noticeModel) {
        this.noticeModel = noticeModel;
    }
    handleConnection() {
        console.log('hello');
    }
    afterInit(server) {
        this.server = server;
        console.log('hello');
    }
    async getAllNotice(model) {
        if (!model) {
            const notices = await this.noticeModel
                .find()
                .populate('user', 'image, id, firstName, lastName');
            return this.server.emit('all', notices);
        }
        else {
            const notices = await this.noticeModel
                .find({ db_model: model })
                .populate('user', 'image, id, firstName, lastName');
            return this.server.emit('all', notices);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", ws_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "getAllNotice", null);
NotificationGateway = __decorate([
    websockets_1.WebSocketGateway({ cors: true }),
    __param(0, mongoose_1.InjectModel(notification_schema_1.Notice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationGateway);
exports.NotificationGateway = NotificationGateway;
//# sourceMappingURL=notification.gateway.js.map