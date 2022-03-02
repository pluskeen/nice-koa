import { ErrorModel, SuccessModel } from '../response/response.class';
import { createUser, getUserInfo } from '../service/user';
import { ErrorInfo } from '../response/response.config';
import { IUserCreationAttributes } from '../database/model';
import { doCrypto } from '../config/crypto.config';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';

/** 用户名是否存在 */
export async function isExist(userName: IUserCreationAttributes['userName']) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(ErrorInfo.registerUserNameNotExistInfo)
  }
}

/** 注册用户 */
export async function register({userName, password}: IUserCreationAttributes) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(ErrorInfo.registerUserNameExistInfo)
  }

  try {
    const result = await createUser({userName, password: doCrypto(password)})
    return new SuccessModel(result)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(ErrorInfo.registerFailInfo)
  }
}

/** 登录 */
export async function login({ctx, userName, password}: ILoginParam) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))

  // 登录失败
  if (!userInfo) {
    return new ErrorModel(ErrorInfo.loginFailInfo)
  }
  // 登录成功
  if (ctx.session.userInfo === null) {
    ctx.session.userInfo = userInfo
  }

  return new SuccessModel()
}

/** 退出登录 */
export async function logout(ctx: ILoginParam['ctx']) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

/** 登陆参数接口 */
interface ILoginParam {
  ctx: ParameterizedContext<DefaultState, DefaultContext, any>
  userName: string,
  password: string
}
