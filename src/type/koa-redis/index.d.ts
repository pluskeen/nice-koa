import { SessionStore } from 'koa-generic-session';
import { ClientOpts } from 'redis';

declare module 'koa-redis' {
  declare function redisStore(options?: ClientOpts): SessionStore;
  export default redisStore;
}
