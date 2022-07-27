/** 保存文件 */
export interface ISaveFile {
  /** 文件大小 */
  size: number;
  /** 文件路径 */
  filePath: string;
  /** 文件新名称 */
  newName: string;
  /** 文件原名称 */
  originName: string;
  /** 文件类型 */
  mimeType: string;
}

/** 响应返回模型 */
export interface IResponse {
  code: number;
  data?: any;
  msg: string;
}
