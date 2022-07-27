import { EGender, ELanguage } from '../utils/enum';

export const USER_SCHEMA = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
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
    },
    gender: {
      enum: [EGender.Male, EGender.Female, EGender.Secret]
    },
    language: {
      enum: [ELanguage.Zh, ELanguage.En]
    },
  },
  additionalProperties: false
}
