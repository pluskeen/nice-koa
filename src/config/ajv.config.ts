import Ajv from 'ajv';

const ajv = new Ajv({
  // allErrors: true // 输出全部错误，速度慢
})

/**
 * json schema 校验
 * @param schema 校验规则
 * @param data 待校验数据
 */
export function validate(schema: object, data: any = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}
