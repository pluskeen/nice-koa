/** api 登录验证 */
import { ErrorModel } from '../response/response.class';
import { ErrorInfo } from '../response/response.config';
import Koa from 'koa';


export default (): Koa.Middleware => {
  // 定义中间件函数
  return async (ctx, next) => {
    // 已登录
    if (ctx.session && ctx.session.userInfo) {
      await next()
      return
    }
    // 未登录
    ctx.body = new ErrorModel(ErrorInfo.loginCheckFailInfo)
  }
}
