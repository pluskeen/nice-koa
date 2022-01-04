/** 响应成功代号 */
export const RES_SUCCESS_CODE = 0;

/** 错误信息 */
export const ErrorInfo = {
  // 用户名已存在
  registerUserNameExistInfo: {
    code: 10001,
    msg: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    code: 10002,
    msg: '注册失败，请重试'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    code: 10003,
    msg: '用户名未存在'
  },
  // 登录失败
  loginFailInfo: {
    code: 10004,
    msg: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    code: 10005,
    msg: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    code: 10006,
    msg: '修改密码失败，请重试'
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    code: 10007,
    msg: '上传文件尺寸过大'
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    code: 10008,
    msg: '修改基本信息失败'
  },
  // json schema 校验失败
  jsonSchemaFileInfo: {
    code: 10009,
    msg: '数据格式校验错误'
  },
  // 删除用户失败
  deleteUserFailInfo: {
    code: 10010,
    msg: '删除用户失败'
  },
  // 添加关注失败
  addFollowerFailInfo: {
    code: 10011,
    msg: '添加关注失败'
  },
  // 取消关注失败
  deleteFollowerFailInfo: {
    code: 10012,
    msg: '取消关注失败'
  },
  // 创建微博失败
  createBlogFailInfo: {
    code: 11001,
    msg: '创建微博失败，请重试'
  },
  // 删除微博失败
  deleteBlogFailInfo: {
    code: 11002,
    msg: '删除微博失败，请重试'
  }
}
