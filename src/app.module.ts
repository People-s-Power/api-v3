import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantModule } from './applicant/applicant.module';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { EnvModule } from './env/env.module';
import config from './utils/config';
import { View, ViewSchema } from './campaign/schema/campaign.schema';

// const redis = new redisStore()

@Module({
  imports: [
    ApplicantModule,
    MongooseModule.forRoot(config.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      // connectionFactory: (connection: Connection) => {
      //   connection.useDb('test');

      //   console.log(connection);
      //   return connection;
      // },
    }),
    MongooseModule.forFeature([{ name: View.name, schema: ViewSchema }]),

    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      installSubscriptionHandlers: true,
      path: '/api/v3/graphql',
      cors: false,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ ttl: 500 }),

    AuthModule,
    UserModule,
    ApplicantModule,
    CampaignModule,
    TransactionModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
