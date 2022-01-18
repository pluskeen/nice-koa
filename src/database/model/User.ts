import {seq} from "../seq";
import {DECIMAL, STRING} from "../types";

// users 表
export const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1 男，2 女，3 保密）'
  },
  picture: {
    type: STRING,
    comment: '头像 图片地址'
  },
  city: {
    type: STRING,
    comment: '城市',
  }
})
