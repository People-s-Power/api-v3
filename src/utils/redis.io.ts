import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';
import { Server, ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
// import * as sharedsession from 'express-socket.io-session';
// import * as session from 'express-session';
import config from './config';

const pubClient = new RedisClient({ url: config.REDIS_URI });
const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
  private app: NestExpressApplication;
  constructor(app: NestExpressApplication) {
    super(app);
    this.app = app;
  }
  createIOServer(port: number, options?: ServerOptions): any {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: true,
    });
    server.adapter(redisAdapter);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const session = require('express-session')({
    //   secret: config.SECRET,
    //   name: '__ed',
    //   saveUninitialized: false,
    //   resave: false,
    //   store: MongoStore.create({
    //     mongoUrl: config.MONGO_URI,
    //     ttl: 2 * 24 * 60 * 60,
    //     autoRemove: 'native',
    //     // mongoOptions: mongooseOption,
    //   }),
    // });
    // this.app.use(session);

    return server;
  }
}
