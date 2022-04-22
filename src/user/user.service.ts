import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import {
  Applicant,
  ApplicantDocument,
} from 'src/applicant/schema/applicant.shema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { connectOldDB } from 'src/utils/connectDb';
import {
  AccountTypeEnum,
  AssignUserAdminDTO,
  ChangeUserAccountTypeDTO,
  ChangeUserRoleDTO,
  StaffRoleEnum,
  UpdateUserDTO,
} from './dto/user.dto';
import { User, UserDocument } from './entity/user.schema';

interface OldUser {
  _id: string;
  target: number;
  position: string;
  role: string;
  isActive: boolean;
  image: string;
  probono: boolean;
  admin: string;
  applicants: ApplicantDocument[];
  name: string;
  email: string;
  password: string;
  token: string;
  __v: number;
  account_number: number;
  address: string;
  bank: string;
  phone: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Applicant.name)
    private readonly applicantModel: Model<ApplicantDocument>,
  ) {}
  async getUsers(
    accountType?: AccountTypeEnum,
    role?: StaffRoleEnum,
    user?: UserDocument,
  ) {
    let data = await this.cacheManager.get<UserDocument[]>('users');

    if (!data) {
      if (user?.role === StaffRoleEnum.Supervisor) {
        data = await this.userModel
          .find({ suppervisor: user?.id })
          .select('-password')
          .sort({ createdAt: -1 })
          .catch((err) => {
            throw err;
          });
      } else {
        data = await this.userModel
          .find()
          .select('-password')
          .sort({ createdAt: -1 })
          .catch((err) => {
            throw err;
          });
      }
    }

    await this.cacheManager.set<UserDocument[]>('users', data);

    try {
      const users: UserDocument[] = data.map((user) => {
        const count = new Promise((resolve) => {
          resolve(
            this.applicantModel.countDocuments({
              $or: [{ rep: user?.id }, { lawyer: user?.id }],
            }),
          );
        });

        const payload = {
          ...user._doc,
          id: user._id,
          applicantCount: count,
        };
        // if(accountType) return users
        return payload;
      });

      if (accountType)
        return users.filter((user) => user.accountType === accountType);
      if (role)
        return users
          .filter((user) => user.role === role)
          .sort((a, b) => {
            if (a.applicantCount > b.applicantCount) return 0;
            else if (a.applicantCount < b.applicantCount) return 1;
            return -1;
          });
      return users;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel
        .findById(id)
        .populate('reps', 'firstName lastName id')
        .select('-password');

      if (!user) throw new NotFoundException('No user found');

      return user;
    } catch (error) {
      throw error;
    }
  }

  async uploadProfileImage(data: {
    image: string;
    id: string;
  }): Promise<UserDocument> {
    try {
      const image = await cloudinaryUpload(data.image);
      const user = await this.userModel.findByIdAndUpdate(
        data.id,
        { $set: { image } },
        { new: true },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id).select('-password');
      if (!user) throw new NotFoundException('User record not found');
      const applicants = await this.applicantModel.find({
        $or: [{ rep: id }, { lawyer: id }],
      });
      if (applicants.length)
        throw new BadRequestException(
          'Unable to delete user, user has contacts associated with it',
        );
      user.remove();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(): Promise<UserDocument[]> {
    try {
      const users = await this.userModel.find();
      users.forEach((user) => user.remove());
      return users;
    } catch (error) {
      throw error;
    }
  }

  async assignUser(data: AssignUserAdminDTO): Promise<UserDocument> {
    if (!data.user_id || !data.admin_id)
      throw new BadRequestException('Provide a user_id and admin_id');
    await this.userModel.findOneAndUpdate(
      { reps: data?.user_id as any },
      { $pull: { reps: data?.user_id } },
      { new: true },
    );

    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id: data.admin_id },
        { $addToSet: { reps: data.user_id } },
        { new: true },
      );
      await this.userModel.findByIdAndUpdate(data?.user_id, {
        $set: { suppervisor: data?.admin_id as unknown as UserDocument },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async changeRole(data: ChangeUserRoleDTO): Promise<UserDocument> {
    const { user_id, role } = data;
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id: user_id },
        { $set: { role: role as StaffRoleEnum } },
        { new: true },
      );
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async accountType(data: ChangeUserAccountTypeDTO): Promise<UserDocument> {
    const { user_id, accountType } = data;
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id: user_id },
        { $set: { accountType: accountType as AccountTypeEnum } },
        { new: true },
      );
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateUser(data: UpdateUserDTO): Promise<UserDocument> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        data.id,
        { ...data },
        {
          new: true,
        },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async uploadImage(file: string, user: UserDocument): Promise<UserDocument> {
    const image = await cloudinaryUpload(file).catch((err) => {
      console.log(err);
      throw new Error('Problem with uploading image');
    });

    try {
      const data = await this.userModel.findByIdAndUpdate(
        user.id,
        {
          $set: { image },
        },
        { new: true },
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  async activateUser(user_id: any) {
    let user = await this.userModel.findById(user_id);
    if (user?.isActive) return this.blockUser(user_id);
    try {
      user = await this.userModel.findById(user_id).select('-password');
      await this.userModel.updateOne(
        { _id: user_id },
        { $set: { isActive: true } },
        { new: true },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  // async deleteManyUser(ids: string[]): Promise<UserDocument[]> {
  //   try {
  //     const users = await this.userModel.find({ _id: { $in: ids } });

  //     return users;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async blockUser(user_id: any) {
    try {
      const user = await this.userModel.findById(user_id).select('-password');
      await this.userModel.updateOne(
        { _id: user_id },
        { $set: { isActive: false } },
        { new: true },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
  async seedUsers() {
    const users: OldUser[] = await connectOldDB('users');

    const fakeUsers = [...users] as OldUser[];

    const newUsers = fakeUsers?.map((user) => {
      const firstName = user?.name.split(' ')[0];
      const lastName = user?.name.split(' ')[1];
      const accountType = AccountTypeEnum.Staff;
      const role =
        user.position === StaffRoleEnum[user?.position]
          ? user?.position
          : StaffRoleEnum.User;
      const country = 'Nigeria';
      const _id = user._id;
      const admin = user?.admin;
      const updatedAt = user?.updatedAt;
      const image =
        user?.image.includes('https://edfhr-dashboard-724077.us1.kinto.io/') ||
        user?.image.includes('https://gravatar.com/avatar') ||
        user?.image.includes('undefined/uploads')
          ? ''
          : user?.image;

      return {
        ...user,
        _id,
        admin,
        firstName,
        lastName,
        accountType,
        role,
        country,
        updatedAt,
        image,
      };
    });
    const findDuplicates = (arr: any[]) => {
      const sortedArray = arr.slice().sort();
      const results = [];
      const duplicates = [];

      for (let i = 0; i < sortedArray.length - 1; i++) {
        const dup = results.find((res) => res.email === sortedArray[i].email);
        if (dup?.email === sortedArray[i]?.email) {
          duplicates.push(sortedArray[i]);
        } else {
          results.push(sortedArray[i]);
        }
      }
      return results;
    };
    try {
      const filtered = findDuplicates(newUsers);
      await this.userModel.deleteMany();
      const users = await this.userModel.insertMany(filtered);

      return users;
    } catch (error) {
      throw error;
    }
  }
}
