import { DATE, DECIMAL, STRING, UNSIGNED_INT } from "../types";
import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { EGender, ELanguage } from '../../utils/enum';
import { seq } from '../seq';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // id can be undefined during creation
  declare id: CreationOptional<number>;
  declare userName: string;
  declare password: string;
  declare gender: EGender;
  declare language: ELanguage;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

// users 表
export const UserModel = User.init(
  {
    id: {
      primaryKey: true,
      type: UNSIGNED_INT,
      autoIncrement: true,
    },
    userName: {
      type: STRING,
      allowNull: false,
      unique: true,
      comment: '用户名'
    },
    gender: {
      type: DECIMAL,
      allowNull: false,
      defaultValue: EGender.Secret,
      comment: '性别（1 男，2 女，3 保密）'
    },
    language: {
      type: DECIMAL,
      allowNull: false,
      defaultValue: ELanguage.Zh,
      comment: '语言偏好（1 中文，2 英文）'
    },
    password: {
      type: STRING,
      allowNull: false,
      comment: '密码',
    },
    createdAt: DATE,
    updatedAt: DATE,

  },
  {
    sequelize: seq,
    tableName: 'users'
  }
)
