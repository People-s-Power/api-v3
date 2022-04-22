import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaffRoleEnum } from 'src/user/dto/user.dto';
import { UserDocument } from 'src/user/entity/user.schema';
import { Env, EnvDocument } from './env.schema';

@Injectable()
export class EnvService {
  constructor(
    @InjectModel(Env.name) private readonly envModel: Model<EnvDocument>,
  ) {}

  async createEnv(data: EnvDocument): Promise<EnvDocument> {
    try {
      const env = await this.envModel.create(data);
      return env;
    } catch (error) {
      throw error;
    }
  }
  async updateEnv(data: EnvDocument, user: UserDocument): Promise<EnvDocument> {
    if (user.role !== StaffRoleEnum.Admin) throw new UnauthorizedException();
    try {
      const env = await this.envModel.findByIdAndUpdate(data.id, data, {
        new: true,
      });
      return env;
    } catch (error) {
      throw error;
    }
  }
  async deleteEnv(id: string, user: UserDocument): Promise<EnvDocument> {
    if (user.role !== StaffRoleEnum.Admin)
      throw new UnauthorizedException("You can't delete this");
    try {
      const env = await this.envModel.findByIdAndDelete(id);
      return env;
    } catch (error) {
      throw error;
    }
  }
  async getEnvs(): Promise<EnvDocument[]> {
    try {
      const envs = await this.envModel.find();
      return envs.filter((e) => !e.isPrivate);
    } catch (error) {
      throw error;
    }
  }
  async getEnv(id: string): Promise<EnvDocument> {
    try {
      const envs = await this.envModel.findById(id);
      return envs;
    } catch (error) {
      throw error;
    }
  }
}
