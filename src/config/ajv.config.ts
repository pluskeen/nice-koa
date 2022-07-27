import Ajv from 'ajv';
import { USER_SCHEMA } from '../schema/user';
import { ESchema } from '../utils/enum';

const ajv = new Ajv({
  // allErrors: true // 输出全部错误，速度慢
})

ajv.addSchema(USER_SCHEMA, ESchema.User);

/**
 * json schema 校验
 * @param schema 校验模式
 */
export function validate(schema: string) {
  return ajv.getSchema(schema)
}
