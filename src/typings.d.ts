import { Request } from 'express';
import { SessionData, Session } from 'express-session';
import { IGeo } from './interfaces';
import { UserDocument } from './user/entity/user.schema';

interface ReqWithUser extends Request {
  user: UserDocument;
}

interface ISession extends Session, SessionData {
  location?: IGeo;
  passport?: {
    user: UserDocument;
  };
}

interface ReqWithPassport extends Request {
  passport: {
    user: UserDocument;
  };
}
