// /**
//  * 基础模块
//  */
// class BaseModel {
//   constructor({errno, data, message}) {
//     this.errno = errno
//
//     if (data) {
//       this.data = data
//     }
//
//     if (message) {
//       this.message = message
//     }
//   }
// }
//
// /**
//  * 成功模型
//  */
// class SuccessModel extends BaseModel {
//   constructor(data = {}) {
//     super({errno: 0, data})
//   }
// }
//
// /**
//  * 失败模型
//  */
// class ErrorModel extends BaseModel {
//   constructor({errno, message}) {
//     super({errno, message})
//   }
// }
//
// export {
//   SuccessModel,
//   ErrorModel
// }
//
//
