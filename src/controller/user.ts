import { ErrorModel, SuccessModel } from '../response/response.class';
import { createUser, deleteUser, getUserInfo, updateUser } from '../service/user';
import { ErrorInfo } from '../response/response.config';
import { doCrypto } from '../config/crypto.config';
import { User } from '../database/model';
import { IChangePawParam, IChangeUseParam, ICreateUserParam, ILoginParam } from '../type/interface/user';
import { DefaultContext } from 'koa';

/** 用户名是否存在 */
export async function isExist(userName: User['userName']) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(ErrorInfo.registerUserNameNotExistInfo)
  }
}

/** 注册用户 */
export async function register({userName, password, gender, language}: ICreateUserParam) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(ErrorInfo.registerUserNameExistInfo)
  }

  try {
    const result = await createUser({userName, gender, language, password: doCrypto(password)})
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
  ctx.session.userInfo = userInfo

  return new SuccessModel()
}

/** 退出登录 */
export async function logout(ctx: DefaultContext) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

/** 删除用户 */
export async function deleteCurrUser(ctx: DefaultContext, id: User['id']) {
  const result = await deleteUser(id)
  if (result) {
    // 成功后删除登陆信息，需要重新登陆
    delete ctx.session.userInfo
    return new SuccessModel()
  }
  return new ErrorModel(ErrorInfo.deleteUserFailInfo)
}

/** 修改密码 */
export async function changePassword({ctx, id, password, newPassword}: IChangePawParam) {
  const result = await updateUser({newPassword: doCrypto(newPassword)}, {id, password: doCrypto(password)})

  if (result) {
    // 成功后删除登陆信息，需要重新登陆
    delete ctx.session.userInfo
    return new SuccessModel()
  }
  return new ErrorModel(ErrorInfo.changePasswordFailInfo)
}

/** 修改用户信息 */
export async function changeUserInfo({gender, id}: IChangeUseParam) {
  const result = await updateUser({gender}, {id})

  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(ErrorInfo.changeInfoFailInfo)
}
