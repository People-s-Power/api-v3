import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { EnvResolver } from './env.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Env, EnvSchema } from './env.schema';

@Module({
  providers: [EnvResolver, EnvService],
  imports: [MongooseModule.forFeature([{ name: Env.name, schema: EnvSchema }])],
})
export class EnvModule {}
