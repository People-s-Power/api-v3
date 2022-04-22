import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { connectOldDB } from 'src/utils/connectDb';
import { CreateAffidavitDTO, UpdateAffidavitDTO } from '../dto/affidavit.dto';
import { Affidavit, AffidavitDocument } from '../schema/affidavit.schema';
import { Applicant, ApplicantDocument } from '../schema/applicant.shema';

@Injectable()
export class AffidavitService {
  constructor(
    @InjectModel(Affidavit.name)
    private readonly affidavitRepo: Model<AffidavitDocument>,

    @InjectModel(Applicant.name)
    private readonly applicantModel: Model<ApplicantDocument>,
  ) {}
  async findAll(): Promise<Affidavit[]> {
    try {
      const affidavits = await this.affidavitRepo
        .find()
        .populate('applicant', 'id name');

      return affidavits;
    } catch (error) {
      throw error;
    }
  }
  async findByApplicant(applicant_id: any): Promise<Affidavit> {
    try {
      const affidavits = await this.affidavitRepo.findOne({
        applicant: applicant_id,
      });

      return affidavits;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Affidavit> {
    try {
      const affidavit = await this.affidavitRepo.findById(id);
      return affidavit;
    } catch (error) {
      throw error;
    }
  }
  async create(
    data: Partial<CreateAffidavitDTO | UpdateAffidavitDTO>,
  ): Promise<Affidavit> {
    let affidavit = await this.affidavitRepo.findOne({
      applicant: data.applicant as any,
    });
    if (affidavit) return await this.update(data);

    try {
      affidavit = await this.affidavitRepo.create(data);
      await this.applicantModel.findByIdAndUpdate(
        data.applicant as any,
        { affidavit: affidavit?.id as any },
        { new: true },
      );

      return affidavit;
    } catch (error) {
      throw error;
    }
  }
  async update(data: Partial<UpdateAffidavitDTO>): Promise<Affidavit> {
    try {
      const affidavit = await this.affidavitRepo.findByIdAndUpdate(
        data.id,
        { ...data, applicant: data.applicant as any },
        { new: true },
      );
      return affidavit;
    } catch (error) {
      throw error;
    }
  }

  async deleteAffidavit(id: string): Promise<Affidavit> {
    try {
      const affidavit = await this.affidavitRepo.findById(id);
      if (!affidavit) throw new NotFoundException('Record not found');

      affidavit.remove();
      return affidavit;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllAffidavitWithoutApplicants(): Promise<Affidavit[]> {
    try {
      const result = await this.affidavitRepo.find({
        applicant_id: { $exists: false },
      });
      result?.forEach((r) => r.remove());
      return result;
    } catch (error) {
      throw error;
    }
  }
  async seedAffidavit() {
    let fakeAffidavits = (await connectOldDB(
      'affidavits',
    )) as AffidavitDocument[];
    fakeAffidavits = [...fakeAffidavits];

    const newAffidavit = fakeAffidavits.map((affidavit) => {
      const _id = affidavit?._id;
      const applicant = affidavit?.applicant_id;
      const applicant_id = affidavit?.applicant_id;
      return {
        ...affidavit,
        _id,
        applicant_id,
        applicant,
      };
    });
    try {
      await this.affidavitRepo.deleteMany();
      const affidavits = await this.affidavitRepo.insertMany(newAffidavit);
      return affidavits;
    } catch (error) {
      throw error;
    }
  }
}
