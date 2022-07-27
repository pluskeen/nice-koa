/**
 * 基础模块
 */
import { IResponse } from '../type/interface/common';
import { RES_SUCCESS_CODE } from './response.config';

class BaseModel {
  private code: number;
  private data: any;
  private msg: string;

  constructor({code, data, msg}: IResponse) {
    this.code = code

    if (data) {
      this.data = data
    }

    if (msg) {
      this.msg = msg
    }
  }
}

/**
 * 成功模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({code: RES_SUCCESS_CODE, data, msg: ''})
  }
}

/**
 * 失败模型
 */
class ErrorModel extends BaseModel {
  constructor({code, msg}: IResponse) {
    super({code, msg})
  }
}

export {
  SuccessModel,
  ErrorModel
}
