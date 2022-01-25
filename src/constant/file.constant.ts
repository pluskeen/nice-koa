import { ITypePattern } from '../type';

/** 文件大小 */
export const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;
/** 文件上传字段 */
export const FILE_UPLOAD_FIELDS = 'file';
/** 常见文件头与类型映射 */
export const FILE_MAP = new Map<string, ITypePattern>([
  [
    'image/bmp',
    {
      BytePattern: 0x424D,
      PatternMask: 0xFFFF,
      IgnoredLeadingBytes: null
    }
  ],
  [
    'image/gif',
    {
      BytePattern: [0x474946383961, 0x474946383761],
      PatternMask: 0xFFFF,
      IgnoredLeadingBytes: null
    }
  ],
  [
    'image/webp',
    {
      BytePattern: 0x5249464600000000574542505650,
      PatternMask: 0xFFFFFFFF00000000FFFFFFFFFFFF,
      IgnoredLeadingBytes: null
    }
  ],
  [
    'image/png',
    {
      BytePattern: 0x89504E470D0A1A0A,
      PatternMask: 0xFFFFFFFFFFFFFFFF,
      IgnoredLeadingBytes: null
    }
  ],
  [
    'image/jpeg',
    {
      BytePattern: 0xFFD8FF,
      PatternMask: 0xFFFFFF,
      IgnoredLeadingBytes: null
    }
  ],
  [
    'application/pdf',
    {
      BytePattern: 0x255044462D,
      PatternMask: 0xFFFFFFFFFF,
      IgnoredLeadingBytes: null
    }
  ],
]);
