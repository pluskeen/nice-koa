// 校验规则
import { validate } from '../config/ajv.config';

const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      pattern: '^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$',
      maxLength: 255,
      minLength: 6
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    }
  }
}

/**
 * 校验用户格式
 * @param data 用户数据
 */
export function userValidate(data = {}) {
  return validate(SCHEMA, data)
}
