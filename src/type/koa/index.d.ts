import { IncomingMessage } from 'http';
import { Fields, Files } from 'formidable';
import { IUserCreationAttributes } from '../../database/model';

interface ExtendReq extends IncomingMessage {
  files: Files,
  fields: Fields,
}

interface Session {
  userInfo?: IUserCreationAttributes,
}

declare module 'koa' {
  interface DefaultContext {
    req: ExtendReq,
    session: Session,
  }

  interface DefaultState {}
}
