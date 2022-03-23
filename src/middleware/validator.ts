import Koa from 'koa';
import { ErrorModel } from '../response/response.class';
import { ErrorInfo } from '../response/response.config';
import { AnyValidateFunction, ErrorObject } from 'ajv/dist/types';
import AjvI18n from 'ajv-i18n';

const localize = {
  zh: AjvI18n.zh,
  en: AjvI18n.en,
}

/**
 * 生成 json schema 验证函数
 * @param validateFn 验证函数
 */
export default (validateFn: AnyValidateFunction<unknown>): Koa.Middleware => {
  // 定义中间件函数
  return async function validator(ctx, next) {
    const data = ctx.request.body
    const valid = validateFn(data)
    // 验证失败
    if (!valid) {
      localize.zh(validateFn.errors)
      console.log(validateFn.errors[0]);

      const errorInfo = {
        ...ErrorInfo.jsonSchemaFileInfo,
        msg: zhErrorMsgFormat(validateFn.errors[0])
      }
      ctx.body = new ErrorModel(errorInfo)
      return
    }
    // 验证成功，继续下一步
    await next()
  }
}

/** 中文错误信息格式化 */
function zhErrorMsgFormat(error: ErrorObject) {
  switch (error.keyword) {
    case 'enum':
      return `${error.message}，允许的值有：${error.params.allowedValues}`;
    case 'additionalProperties':
      return `${error.message}：${error.params.additionalProperty}`;
    default:
      return '数据格式校验错误';
  }
}
