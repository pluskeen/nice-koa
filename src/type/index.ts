/** 保存文件 */
export interface ISaveFile {
  size: number;
  filePath: string;
  newName: string;
  originName: string;
  mimeType: string;
}

/** 响应返回模型 */
export interface IResponse {
  code: number;
  data?: any;
  msg: string;
}

/**
 * MIME type pattern
 * https://mimesniff.spec.whatwg.org/#matching-a-mime-type-pattern
 */
export interface ITypePattern {
  BytePattern: number | number[];
  PatternMask: number;
  IgnoredLeadingBytes: number | number[] | null;
}
