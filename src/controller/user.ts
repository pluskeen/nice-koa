import { ErrorModel, SuccessModel } from '../response/response.class';
import { createUser, getUserInfo } from '../service/user';
import { ErrorInfo } from '../response/response.config';
import { IUserCreationAttributes } from '../database/model';
import { doCrypto } from '../config/crypto.config';

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
