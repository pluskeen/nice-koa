import { IncomingMessage } from 'http';
import { Fields, Files } from 'formidable';

interface ExtendReq extends IncomingMessage {
  files: Files,
  fields: Fields,
}

declare module 'koa' {
  interface DefaultContext {
    req: ExtendReq,
  }

  interface DefaultState {}
}
