"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoticeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const notification_schema_1 = require("./notification.schema");
class CreateNoticeDTO extends swagger_1.PartialType(notification_schema_1.Notice) {
}
exports.CreateNoticeDTO = CreateNoticeDTO;
//# sourceMappingURL=noticeDTO.js.map