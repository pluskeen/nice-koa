import { seq } from "../seq";
import { STRING, UNSIGNED_INT } from "../types";
import { Model, Optional } from 'sequelize';

interface IUserAttributes {
  id: number;
  userName: string;
  password: string;
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
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  }
})
