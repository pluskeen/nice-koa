import { IncomingMessage } from 'http';
import { Fields, Files } from 'formidable';

interface ExtendReq extends IncomingMessage {
  files: Files,
  fields: Fields,
}

interface Session {
  userInfo?: any,
}

declare module 'koa' {
  interface DefaultContext {
    req: ExtendReq,
    session: Session,
  }

  interface DefaultState {}
}
