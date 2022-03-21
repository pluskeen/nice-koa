import { seq } from "../seq";
import { DECIMAL, STRING, UNSIGNED_INT } from "../types";
import { Model, Optional } from 'sequelize';
import { Gender } from '../../enum';

interface IUserAttributes {
  id: number;
  userName: string;
  password: string;
  gender: Gender;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}

export interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, IUserAttributes {}

// users 表
export const UserModel = seq.define<IUserInstance>('user', {
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
    defaultValue: Gender.Secret,
    comment: '性别（1 男，2 女，3 保密）'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  }
})
