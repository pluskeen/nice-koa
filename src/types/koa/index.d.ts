import { ExtendableContext as exCxt } from 'koa';
import { IncomingMessage } from 'http';
import { Fields, Files } from 'formidable';

interface ExtendReq extends IncomingMessage {
  files: Files,
  fields: Fields,
}

declare namespace Application {
  interface ExtendableContext extends exCxt {
    req: ExtendReq
  }
}
