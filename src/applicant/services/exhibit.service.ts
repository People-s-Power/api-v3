import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { connectOldDB } from 'src/utils/connectDb';
import { CreateExhibitDTO, UpdateExhibitDTO } from '../dto/exhibit.dto';
import { Exhibit, ExhibitDocument } from '../schema/exhibit.schema';

@Injectable()
export class ExhibitService {
  constructor(
    @InjectModel(Exhibit.name)
    private readonly exhibitModel: Model<ExhibitDocument>,
  ) {}

  async create(data: CreateExhibitDTO): Promise<Exhibit> {
    const image = await cloudinaryUpload(data.image).catch((err) => {
      throw err;
    });
    try {
      const exhibit = await this.exhibitModel.create({ ...data, image });
      return exhibit;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Exhibit[]> {
    try {
      const exhibits = await this.exhibitModel.find();
      return exhibits;
    } catch (error) {
      throw error;
    }
  }
  async findByApplicant(applicant_id: any): Promise<Exhibit[]> {
    try {
      const exhibits = await this.exhibitModel.find({ applicant_id });
      return exhibits;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Exhibit> {
    try {
      const exhibit = await this.exhibitModel.findById(id);
      return exhibit;
    } catch (error) {
      throw error;
    }
  }
  async update(data: UpdateExhibitDTO): Promise<Exhibit> {
    try {
      const exhibit = await this.exhibitModel.findByIdAndUpdate(
        data.id,
        { ...data, applicant_id: data.applicant_id as any },
        {
          new: true,
        },
      );
      return exhibit;
    } catch (error) {
      throw error;
    }
  }
  async deleteOne(id: string): Promise<Exhibit> {
    try {
      const exhibit = await this.exhibitModel.findById(id);
      if (!exhibit) throw new NotFoundException('Record not found');
      exhibit.remove();
      return exhibit;
    } catch (error) {
      throw error;
    }
  }
  async seedExhibits() {
    const fakeExhibits = (await connectOldDB('exhibits')) as ExhibitDocument[];
    const newExhibits = fakeExhibits.map((exhibit) => {
      const image =
        exhibit?.image?.includes(
          'https://edfhr-dashboard-724077.us1.kinto.io/uploads/',
        ) || exhibit?.image?.includes('undefined/upload')
          ? ' '
          : exhibit?.image;

      return {
        _id: exhibit._id,
        applicant_id: exhibit?.applicant_id,
        name: exhibit?.name || 'No name',
        image,
      };
    });
    try {
      await this.exhibitModel.deleteMany();
      return await this.exhibitModel.insertMany(newExhibits);
    } catch (error) {
      throw error;
    }
  }
}
