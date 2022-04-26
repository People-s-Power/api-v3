import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
export declare class RedisIoAdapter extends IoAdapter {
    private app;
    constructor(app: NestExpressApplication);
    createIOServer(port: number, options?: ServerOptions): any;
}
