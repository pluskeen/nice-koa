/** MIME 类型 */
export enum EMIMEType {
  /** 二进制数据 */
  Application = 'application',
  /** 音频数据 */
  Audio       = 'audio',
  /** 字体 */
  Font        = 'font',
  /** 图像数据 */
  Image       = 'image',
  /** 3D 对象或场景的模型数据 */
  Model       = 'model',
  /** 纯文本数据 */
  Text        = 'text',
  /** 视频数据 */
  Video       = 'video'
}

export * from './schema';
export * from './user';
