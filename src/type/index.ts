/** 保存文件 */
export interface ISaveFile {
  size: number;
  filePath: string;
  originName: string | null;
  type: string | null;
}

/** 返回模型 */
export interface IResponse {
  code: number;
  data?: any;
  msg: string;
}
