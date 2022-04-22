import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import {
  CreateEndorsementDTO,
  LikeEndorsementDTO,
  UpdateEndorsementDTO,
} from '../dto/endorsement.dto';
import { CampaignGateway } from '../gateway/campaign.gateway';
import { Campaign, CampaignDocument } from '../schema/campaign.schema';
import { Endorsement, EndorsementDocument } from '../schema/endorsement.schema';

@Injectable()
export class EndorsementService {
  constructor(
    @InjectModel(Endorsement.name)
    private readonly endorsementModel: Model<EndorsementDocument>,
    @InjectModel(Campaign.name)
    private readonly CampaignModel: Model<CampaignDocument>,
    private campaignGateway: CampaignGateway,
  ) {}

  async create(
    data: CreateEndorsementDTO,
    user: UserDocument,
  ): Promise<Endorsement> {
    const { campaign, body } = data;
    try {
      const endorsement = await this.endorsementModel.create({
        campaign,
        body,
        author: user.id as any,
      });
      const campaign1 = await this.CampaignModel.findOneAndUpdate(
        { _id: campaign },
        { $addToSet: { endorsements: endorsement } },
        { new: true },
      );

      await this.campaignGateway.endorsedCampaign({
        campaignTitle: campaign1.title,
        user,
      });
      return endorsement;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Endorsement[]> {
    try {
      const endorsements = await this.endorsementModel
        .find()
        .populate('author', 'id firstName lastName');

      return endorsements;
    } catch (error) {
      throw error;
    }
  }
  async findByCampaign(campaign: any): Promise<Endorsement[]> {
    try {
      const endorsements = await this.endorsementModel
        .find({ campaign })
        .populate('author', 'id firstName lastName image');
      return endorsements;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Endorsement> {
    try {
      const endorsements = await this.endorsementModel
        .findById(id)
        .populate('author', 'id firstName lastName');
      return endorsements;
    } catch (error) {
      throw error;
    }
  }
  async update(data: UpdateEndorsementDTO): Promise<Endorsement> {
    try {
      const endorsement = await this.endorsementModel.findByIdAndUpdate(
        data.id,
        data,
        { new: true },
      );
      return endorsement;
    } catch (error) {
      throw error;
    }
  }
  async like(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean> {
    let endorsement = await this.endorsementModel.findById(data.id);

    if (endorsement?.likes?.includes(user.id)) {
      return await this.unLike(data, user);
    } else
      try {
        endorsement = await this.endorsementModel.findByIdAndUpdate(
          data.id,
          { $addToSet: { likes: user?.id } },
          { new: true },
        );
        return true;
      } catch (error) {
        throw error;
      }
  }
  async unLike(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean> {
    try {
      await this.endorsementModel.findByIdAndUpdate(
        data.id,
        { $pull: { likes: user?.id } },
        { new: true },
      );
      return false;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<Endorsement> {
    try {
      const endorsement = await this.endorsementModel.findById(id);
      if (!id) throw new NotFoundException('No Record found');
      await this.CampaignModel.updateOne(
        { _id: endorsement.campaign },
        { $pull: { endorsements: id } },
      );
      endorsement.remove();
      return endorsement;
    } catch (error) {
      throw error;
    }
  }
  async deleteMany(): Promise<number> {
    try {
      const res = await this.endorsementModel.deleteMany();
      return res.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}
