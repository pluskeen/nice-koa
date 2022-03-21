import { IUserCreationAttributes, UserModel } from '../database/model';
import { Gender } from '../enum';

/** 创建用户 */
export async function createUser({userName, gender, password}: IUserCreationAttributes) {
  return await UserModel.create({userName, gender, password})
}

/** 删除用户 */
export async function deleteUser(id: IUserCreationAttributes['id']) {
  const result = await UserModel.destroy({
    where: {
      id
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


/** 更新用户信息、密码、性别 */
export async function updateUser(
  {newPassword, gender}: { newPassword?: IUserCreationAttributes['password'], gender?: Gender },
  {id, password}: {id: IUserCreationAttributes['id'], password?: IUserCreationAttributes['password']}
) {
  // 拼接修改内容
  const updateData: any = {}
  if (newPassword) {
    updateData.password = newPassword
  }

  if (gender) {
    updateData.gender = gender
  }

  // 拼接查询条件
  const whereOpt = {
    id
  }
  if (password) {
    Object.assign(whereOpt, {password})
  }

  // 执行修改
  const result = await UserModel.update(updateData, {
    where: whereOpt
  })
  // console.log('updateUser', result)
  return result[0] > 0
}
