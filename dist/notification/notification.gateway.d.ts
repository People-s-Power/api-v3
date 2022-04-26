import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { NoticeDocument } from 'src/notification/notification.schema';
import { Server } from 'ws';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayInit {
    private noticeModel;
    constructor(noticeModel: Model<NoticeDocument>);
    server: Server;
    handleConnection(): void;
    afterInit(server: Server): void;
    getAllNotice(model?: string): Promise<boolean>;
}
