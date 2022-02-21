import { IUserCreationAttributes, UserModel } from '../database/model';

/** 创建用户 */
export async function createUser({userName, password}: IUserCreationAttributes) {
  return await UserModel.create({userName, password})
}

/** 删除用户 */
export async function deleteUser(userName: string) {
  const result = await UserModel.destroy({
    where: {
      userName
    }
  })
  // result 删除的行数
  return result > 0
}

/** 从数据库获取用户信息 */
export async function getUserInfo(userName: string, password?: string) {
  // 查询条件
  const whereOpt = {
    userName,
  }

  if (password) {
    Object.assign(whereOpt, {password})
  }

  // 查询
  const result = await UserModel.findOne({
    attributes: ['id', 'userName'],
    where: whereOpt,
  })

  if (result === null) {
    // 未找到
    return result
  }

  return result
}


/**
 * 更新用户信息
 * @param newPassword 新密码
 * @param userName 用户名
 * @param password 密码
 */
export async function updateUser(
  {newPassword}: { newPassword: string },
  {userName, password}: IUserCreationAttributes
) {
  // 拼接修改内容
  const updateData: any = {}
  if (newPassword) {
    updateData.password = newPassword
  }

  // 拼接查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {password})
  }

  // 执行修改
  const result = await UserModel.update(updateData, {
    where: whereOpt
  })
  console.log('updateUser', result)
  return result[0] > 0
}
