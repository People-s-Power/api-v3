import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { connectOldDB } from 'src/utils/connectDb';
import { CreateRelativeDTO, UpdateRelativeDTO } from '../dto/relative.dto';
import { Relative, RelativeDocument } from '../schema/relative.schema';
import { ApplicantService } from './applicant.service';

@Injectable()
export class RelativeService {
  constructor(
    @InjectModel(Relative.name)
    private readonly relativeModel: Model<RelativeDocument>,
    private readonly applicantService: ApplicantService,
  ) {}

  async create(data: CreateRelativeDTO): Promise<Relative> {
    if (!data.applicant_id) throw new Error('Please add the applicant_id');
    try {
      const relative = await this.relativeModel.create(data);
      await this.applicantService.addRelative(
        data.applicant_id as any,
        relative.id,
      );
      return relative;
    } catch (error) {
      throw error;
    }
  }
  async update(data: UpdateRelativeDTO): Promise<Relative> {
    try {
      const relative = await this.relativeModel.findByIdAndUpdate(
        data.id,
        { ...data, applicant_id: data.id as any },
        { new: true },
      );

      return relative;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<Relative> {
    try {
      const relative = await this.relativeModel.findById(id);
      if (!relative) throw new NotFoundException('Record not found');
      await this.applicantService.removeRelative(
        relative.applicant_id as any,
        relative.id,
      );
      relative.remove();
      return relative;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Relative[]> {
    try {
      return await this.relativeModel.find();
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Relative> {
    try {
      const relative = await this.relativeModel.findById(id);
      if (!relative) throw new NotFoundException('Record not found');
      console.log(relative);
      return relative;
    } catch (error) {
      throw error;
    }
  }
  async findByApplicantId(applicant_id: any): Promise<Relative[]> {
    try {
      return await this.relativeModel.find({ applicant_id });
    } catch (error) {
      throw error;
    }
  }
  async seedRelatives() {
    let fakeRelatives = await connectOldDB('relatives');
    fakeRelatives = [...fakeRelatives] as RelativeDocument[];
    const newRelatives = fakeRelatives.map((relative) => {
      return {
        ...relative,
        applicant_id: relative?.applicant_id,
        phone: relative?.phone || '00000000000',
        email: relative?.email || '',
        name: relative?.name || 'no name',
      };
    });
    try {
      await this.relativeModel.deleteMany();
      return await this.relativeModel.insertMany(newRelatives);
    } catch (error) {
      throw error;
    }
  }
}
