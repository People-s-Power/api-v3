import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { ReqWithUser } from 'src/typings';
import { StaffRoleEnum } from 'src/user/dto/user.dto';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { connectOldDB } from 'src/utils/connectDb';
import {
  AssignApplicantDTO,
  CreateApplicantDTO,
  UpdateApplicantDTO,
  UploadContactFormDTO,
} from '../dto/applicant.dto';
import { Affidavit, AffidavitDocument } from '../schema/affidavit.schema';
import { Applicant, ApplicantDocument } from '../schema/applicant.shema';
import { ReportService } from './report.service';

@Injectable()
export class ApplicantService {
  constructor(
    private readonly reportService: ReportService,
    @InjectModel(Applicant.name)
    private readonly applicantRepo: Model<ApplicantDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Affidavit.name)
    private readonly affidavitModel: Model<AffidavitDocument>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(REQUEST) private readonly req: ReqWithUser,
  ) {}
  async findAll(user?: UserDocument): Promise<Applicant[]> {
    let applicants = await this.cacheManager.get<ApplicantDocument[]>(
      'applicants',
    );
    try {
      if (!applicants) {
        if (user?.role === StaffRoleEnum.Supervisor) {
          applicants = await this.applicantRepo
            .find({
              rep: { $in: [...user?.reps, user?.id] as any },
            })
            .populate('rep lawyer', 'id firstName lastName')
            .sort({ createdAt: -1 });
        } else if (
          user?.role === StaffRoleEnum.Rep ||
          user?.role === StaffRoleEnum.Lawyer
        ) {
          applicants = await this.findByUser(user?.id);
        } else {
          applicants = await this.applicantRepo
            .find()
            .populate('rep lawyer', 'id firstName lastName')
            .sort({ createdAt: -1 });
        }
        await this.cacheManager.set<ApplicantDocument[]>(
          'applicants',
          applicants,
          { ttl: 500 },
        );
      }

      return applicants;
    } catch (error) {
      throw error;
    }
  }
  async findByUser(id: any): Promise<ApplicantDocument[]> {
    try {
      const applicant = await this.applicantRepo
        .find({ $or: [{ rep: id }, { lawyer: id }] })
        .populate('rep lawyer', 'id firstName lastName')
        .sort({ createdAt: -1 });

      return applicant;
    } catch (error) {
      throw error;
    }
  }
  async create(
    data: CreateApplicantDTO,
    user: UserDocument,
  ): Promise<Applicant> {
    const contact_form = await cloudinaryUpload(data.contact_form).catch(
      (err) => {
        throw err;
      },
    );
    if (!user.id) throw new BadRequestException('No user found');
    try {
      const applicant = this.applicantRepo.create({
        ...data,
        contact_form,
        rep: user.id,
      });

      return applicant;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Applicant> {
    try {
      const applicant = await this.applicantRepo
        .findById(id)
        .populate('affidavit')
        .populate('relatives');

      if (!applicant) throw new NotFoundException('Record not found');
      return applicant;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<Applicant> {
    try {
      const applicant = await this.applicantRepo.findById(id);
      if (!applicant) throw new NotFoundException('Record not found');
      const reports = await this.reportService.findByApplicant(id);
      if (reports.length) {
        reports.forEach(
          async (report) => await this.reportService.delete(report.id),
        );
      }
      await this.affidavitModel.deleteOne({ applicant: applicant?.id });
      applicant.remove();
      return applicant;
    } catch (error) {
      throw error;
    }
  }

  async update(data: Partial<UpdateApplicantDTO>): Promise<Applicant> {
    try {
      const applicant = await this.applicantRepo.findOneAndUpdate(
        { _id: data.id },
        { ...data },
        { new: true },
      );
      return applicant;
    } catch (error) {
      throw error;
    }
  }
  async assignToUser(data: AssignApplicantDTO): Promise<ApplicantDocument> {
    const user = await this.userModel.findOne({ _id: data.user_id });
    if (!user) throw new BadRequestException('Invalid user id');
    const assignRep = async () => {
      try {
        const applicant = await this.applicantRepo.findOneAndUpdate(
          {
            _id: data.applicant_id,
          },
          {
            rep: user.id,
          },
          { new: true },
        );

        return applicant;
      } catch (error) {
        throw error;
      }
    };
    const assignLawyer = async () => {
      try {
        const applicant = await this.applicantRepo.findOneAndUpdate(
          {
            _id: data.applicant_id,
          },
          {
            lawyer: user.id,
          },
          { new: true },
        );

        return applicant;
      } catch (error) {
        throw error;
      }
    };

    if (user.role === StaffRoleEnum.Rep) return await assignRep();
    else if (user.role === StaffRoleEnum.Lawyer) return await assignLawyer();
    else
      throw new BadRequestException(
        'Sorrry you can only assign a user to rep or lawyer',
      );
  }
  async addAffidavit(
    applicant_id: string,
    affidavit_id: string,
  ): Promise<void> {
    try {
      await this.applicantRepo.findByIdAndUpdate(applicant_id, {
        $set: { affidavit: affidavit_id as any },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async addExhibit(applicant_id: string, exhibit_id: string): Promise<void> {
    try {
      await this.applicantRepo.findByIdAndUpdate(applicant_id, {
        $addToSet: { exhibits: exhibit_id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async removeExhibit(applicant_id: string, exhibit_id: string): Promise<void> {
    try {
      await this.applicantRepo.findByIdAndUpdate(applicant_id, {
        $pull: { exhibits: exhibit_id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async addRelative(applicant_id: string, relative_id: string): Promise<void> {
    try {
      await this.applicantRepo.findByIdAndUpdate(applicant_id, {
        $addToSet: { relatives: relative_id as any },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async removeRelative(
    applicant_id: string,
    relative_id: string,
  ): Promise<void> {
    try {
      await this.applicantRepo.findByIdAndUpdate(applicant_id, {
        $pull: { relatives: relative_id as any },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async uploadContactForm(data: UploadContactFormDTO): Promise<Applicant> {
    try {
      const contact_form = await cloudinaryUpload(data.contact_form).catch(
        (err) => {
          throw err;
        },
      );
      const applicant = await this.applicantRepo.findByIdAndUpdate(
        data.applicant_id,
        { $set: { contact_form } },
      );
      return applicant;
    } catch (error) {
      throw error;
    }
  }
  async getDraft(applicant_id: any): Promise<Applicant> {
    try {
      const applicant = await this.findOne(applicant_id);
      const { caseType, affidavit } = applicant;
      if (caseType !== 'A' && !affidavit)
        throw new NotFoundException('Please add or update the affidavit');
      return applicant;
    } catch (error) {
      throw error;
    }
  }

  async countApplicantsByUser(user_id: any) {
    try {
      const applicantCount = await this.applicantRepo.countDocuments({
        $or: [{ rep: user_id }, { lawyer: user_id }],
      });
      console.log(applicantCount);
      return applicantCount;
    } catch (error) {
      throw error;
    }
  }
  async seedApplicants() {
    let fakeApplicants = (await connectOldDB(
      'applicants',
    )) as ApplicantDocument[];

    fakeApplicants = [...fakeApplicants] as ApplicantDocument[];
    const newApplicants = fakeApplicants.map((applicant) => {
      const _id = applicant._id;

      const rep = applicant?.rep;
      const lawyer = applicant?.lawyer;

      return {
        ...applicant,
        _id,
        rep,
        lawyer,
      };
    });
    try {
      await this.applicantRepo.deleteMany();
      const applicants = await this.applicantRepo.insertMany(newApplicants);
      return applicants;
    } catch (error) {
      throw error;
    }
  }
}
