/** 登录验证 */
import { ErrorModel } from '../response/response.class';
import { ErrorInfo } from '../response/response.config';
import cookie from 'cookie';
import Koa from 'koa';
import { COOKIE_KEY, REDIS_COOKIE_KEY } from '../constant';
import { get } from '../redis';


export default (): Koa.Middleware => {
  // 定义中间件函数
  return async (ctx, next) => {
    const cookies = ctx.request.header.cookie

    if (cookies) {
      const loginCookie = cookie.parse(cookies)[COOKIE_KEY];
      const res = await get(`${REDIS_COOKIE_KEY}${loginCookie}`);

      if (typeof res === 'object' && Reflect.has(res, 'userInfo')) {
        await next()
        return
      } else {
        // 未登录
        ctx.body = new ErrorModel(ErrorInfo.loginCheckFailInfo)
      }
    } else {
      // 未登录
      ctx.body = new ErrorModel(ErrorInfo.loginCheckFailInfo)
    }
  }
}
