import { IncomingMessage } from 'http';
import { Fields, Files } from 'formidable';
import { User } from '../../database/model';
import { ParameterizedContext } from 'koa';

interface ExtendReq extends IncomingMessage {
  files: Files;
  fields: Fields;
}

interface Session {
  userInfo: User;
}

declare module 'koa' {
  interface DefaultContext {
    req: ExtendReq;
    session: Session;
  }

  interface DefaultState {}

  /** 上下文参数，自定义拓展 */
  interface Ctx extends ParameterizedContext<DefaultState, DefaultContext, any> {}
}
