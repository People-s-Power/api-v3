"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const ipLocation = require("ip-to-location");
const interfaces_1 = require("../interfaces");
let LocationMiddleware = class LocationMiddleware {
    async use(req, res, next) {
        var _a;
        const ip = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.ed_LOCAL;
        const session = req.session;
        const location = await ipLocation.fetch(ip).catch((err) => {
            throw err;
        });
        if (!session.location) {
            session.location = Object.assign(Object.assign({}, location), { ip });
        }
        next();
    }
};
LocationMiddleware = __decorate([
    common_1.Injectable()
], LocationMiddleware);
exports.LocationMiddleware = LocationMiddleware;
//# sourceMappingURL=location.middleware.js.map