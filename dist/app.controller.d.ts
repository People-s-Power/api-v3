import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    renderV3(): string;
    conver(input: {
        currency: string;
    }): Promise<any>;
}
