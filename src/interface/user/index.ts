import { User } from '../../database/model';
import { Ctx } from 'koa';

/** 创建用户参数 */
export interface ICreateUserParam {
  userName: User['userName'],
  gender: User['gender'],
  password: User['password'],
  language: User['language']
}

/** 登陆参数 */
export interface ILoginParam {
  userName: string,
  password: string,
  ctx: Ctx
}

/** 修改密码参数 */
export interface IChangePawParam {
  id: User['id'],
  password: User['password'],
  newPassword: User['password'],
  ctx: Ctx
}

/** 修改用户信息参数 */
export interface IChangeUseParam {
  id: User['id'],
  gender: User['gender'],
}

