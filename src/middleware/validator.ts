import Koa from 'koa';
import { ErrorObject } from 'ajv';
import { ErrorModel } from '../response/response.class';
import { ErrorInfo } from '../response/response.config';

/**
 * 生成 json schema 验证函数
 * @param validateFn 验证函数
 */
export default (validateFn: (data: any) => ErrorObject | undefined): Koa.Middleware => {
  // 定义中间件函数
  return async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    console.log(error);
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(ErrorInfo.jsonSchemaFileInfo)
      return
    }
    // 验证成功，继续下一步
    await next()
  }
}
