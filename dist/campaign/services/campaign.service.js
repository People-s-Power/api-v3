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
exports.CampaignService = exports.ISessionResponseData = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const interfaces_1 = require("../../interfaces");
const notification_schema_1 = require("../../notification/notification.schema");
const user_schema_1 = require("../../user/entity/user.schema");
const cloudinary_1 = require("../../utils/cloudinary");
const campaign_interface_1 = require("../dto/campaign.interface");
const campaign_gateway_1 = require("../gateway/campaign.gateway");
const campaign_schema_1 = require("../schema/campaign.schema");
const endorsement_schema_1 = require("../schema/endorsement.schema");
const sendMaijet_1 = require("../../utils/sendMaijet");
class ISessionResponseData {
}
exports.ISessionResponseData = ISessionResponseData;
let CampaignService = class CampaignService {
    constructor(userModel, viewModel, campaignModel, endorsementModel, noticeModel, campaignGateway, connection) {
        this.userModel = userModel;
        this.viewModel = viewModel;
        this.campaignModel = campaignModel;
        this.endorsementModel = endorsementModel;
        this.noticeModel = noticeModel;
        this.campaignGateway = campaignGateway;
        this.connection = connection;
    }
    async create(data, user) {
        const author = user === null || user === void 0 ? void 0 : user.id;
        if (!author)
            throw new common_1.UnauthorizedException('No author');
        const image = await cloudinary_1.cloudinaryUpload(data.image).catch((err) => {
            throw err;
        });
        const { body } = data;
        let excerpt;
        if (body) {
            excerpt = body.split(' ').splice(0, 36).join(' ');
        }
        try {
            const campaign = await this.campaignModel.create(Object.assign(Object.assign({}, data), { author,
                excerpt,
                image, numberOfPaidEndorsementCount: 0, numberOfPaidViewsCount: 0 }));
            this.campaignGateway.createdCampaign({
                campaignTitle: campaign.title,
                user,
            });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(limit) {
        try {
            const campaigns = await this.campaignModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('author', 'id firstName lastName')
                .populate('endorsements', 'id')
                .populate('views');
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllActive(limit) {
        try {
            const campaigns = await this.campaignModel
                .find({ status: campaign_interface_1.CampaignStatusEnum.Active })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('author', 'id firstName lastName')
                .populate('endorsements', 'id');
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(slug) {
        try {
            const campaigns = await this.campaignModel
                .findOne({ slug })
                .populate('author', 'id firstName lastName')
                .populate('endorsements');
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data) {
        try {
            const campaign = await this.campaignModel.findOneAndUpdate({ _id: data.id }, data, { new: true });
            const author = await this.userModel.findById(campaign.author);
            await sendMaijet_1.updateCampMail(campaign.title, author.email, author.name);
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const campaign = await this.campaignModel.findById(id);
            if (!campaign)
                throw new common_1.NotFoundException('Record not found');
            await this.endorsementModel.deleteMany({ campaign: id });
            campaign.remove();
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async updateSession(id, sessionID) {
        try {
            let campaign = await this.campaignModel.findById(id);
            const session = await this.session(sessionID);
            if (!campaign)
                throw new common_1.NotFoundException();
            let view = await this.connection.models.View.findOne({
                sessionId: session.id,
            });
            if (!view) {
                view = await this.connection.models.View.create({
                    sessionId: session.id,
                    country: session.location.country_name,
                    user: session === null || session === void 0 ? void 0 : session.user,
                });
            }
            else {
                if (!campaign.views.some((v) => v.sessionId === session.id)) {
                    campaign = await this.campaignModel.findByIdAndUpdate(id, {
                        $addToSet: {
                            views: view.id,
                        },
                    }, { new: true });
                }
            }
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async like(campaign_id, user) {
        var _a;
        const campaign = await this.campaignModel.findById(campaign_id);
        if ((_a = campaign === null || campaign === void 0 ? void 0 : campaign.likes) === null || _a === void 0 ? void 0 : _a.includes(user.id)) {
            return await this.unLike(campaign_id, user);
        }
        else {
            try {
                const campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, { $addToSet: { likes: user === null || user === void 0 ? void 0 : user.id } }, { new: true });
                return campaign;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async unLike(campaign_id, user) {
        try {
            const campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, { $pull: { likes: user === null || user === void 0 ? void 0 : user.id } }, { new: true });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async myCampaigns(user_id) {
        try {
            const campaigns = await this.campaignModel
                .find({
                author: user_id,
            })
                .sort({ createdAt: -1 });
            return campaigns;
        }
        catch (error) {
            throw error;
        }
    }
    async approveCampaign(campaign_id) {
        let campaign = await this.campaignModel.findById(campaign_id);
        try {
            campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, {
                $set: {
                    status: campaign.status === campaign_interface_1.CampaignStatusEnum.Active
                        ? campaign_interface_1.CampaignStatusEnum.Pending
                        : campaign_interface_1.CampaignStatusEnum.Active,
                },
            }, { new: true });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async viewedBy(id, userId) {
        try {
            const campaign = await this.campaignModel.findById(id);
            const user = await this.userModel.findById(userId);
            if (!campaign || !user)
                throw new Error('Not found');
            const data = {
                sessionId: 'session.id',
                country: 'session.location.country_name',
                user: userId,
            };
            const author = await this.userModel.findById(campaign.author);
            campaign.views.push(userId);
            campaign.save();
            await sendMaijet_1.viewCampMail(campaign.title, user === null || user === void 0 ? void 0 : user.name, author.email, author.name);
            return 'Viewer Added';
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async findAllNotice(model) {
        try {
            if (model) {
                const notifications = await this.noticeModel
                    .find({
                    db_model: model,
                })
                    .populate({
                    path: 'user',
                    select: 'id image firstName lastName',
                })
                    .sort({ createdAt: -1 });
                return notifications;
            }
            else {
                const notifications = await this.noticeModel
                    .find({})
                    .populate({
                    path: 'user',
                    select: 'id image firstName lastName',
                })
                    .sort({ createdAt: -1 });
                return notifications;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async feature(campaign_id) {
        let campaign = await this.campaignModel.findById(campaign_id);
        try {
            campaign = await this.campaignModel.findOneAndUpdate({ _id: campaign_id }, { $set: { featured: !campaign.featured } });
            return campaign;
        }
        catch (error) {
            throw error;
        }
    }
    async session(_id) {
        try {
            const data = await this.connection.db
                .collection('sessions')
                .findOne({ _id });
            if (!data)
                throw new common_1.NotFoundException();
            const result = JSON.parse(data.session);
            return {
                id: data._id,
                user: result.passport.user.id,
                location: result.location,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
CampaignService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(1, mongoose_1.InjectModel(campaign_schema_1.View.name)),
    __param(2, mongoose_1.InjectModel(campaign_schema_1.Campaign.name)),
    __param(3, mongoose_1.InjectModel(endorsement_schema_1.Endorsement.name)),
    __param(4, mongoose_1.InjectModel(notification_schema_1.Notice.name)),
    __param(6, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        campaign_gateway_1.CampaignGateway,
        mongoose_2.Connection])
], CampaignService);
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map