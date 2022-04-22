import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as ipLocation from 'ip-to-location';
import { IGeo } from 'src/interfaces';
import { ISession } from 'src/typings';
@Injectable()
export class LocationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.cookies?.ed_LOCAL;
    const session: ISession = req.session;
    const location: IGeo = await ipLocation.fetch(ip).catch((err) => {
      throw err;
    });
    if (!session.location) {
      session.location = { ...location, ip };
    }

    next();
  }
}
