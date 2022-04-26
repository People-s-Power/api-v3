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
exports.RelativeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const relative_service_1 = require("../services/relative.service");
let RelativeResolver = class RelativeResolver {
    constructor(relativeService) {
        this.relativeService = relativeService;
    }
    getRelativesByApplicant(applicant_id) {
        return this.relativeService.findByApplicantId(applicant_id);
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('applicant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelativeResolver.prototype, "getRelativesByApplicant", null);
RelativeResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [relative_service_1.RelativeService])
], RelativeResolver);
exports.RelativeResolver = RelativeResolver;
//# sourceMappingURL=relative.resolver.js.map