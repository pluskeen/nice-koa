import { seq } from "../seq";
import { STRING } from "../types";

// files 表
export const File = seq.define('file', {
  fileId: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '文件ID，唯一'
  },
  path: {
    type: STRING,
    allowNull: false,
    comment: '所在路径',
  },
  fileName: {
    type: STRING,
    allowNull: false,
    comment: '文件名，含拓展名'
  },
  originName: {
    type: STRING,
    allowNull: false,
    comment: '文件原名，含拓展名'
  },
  mimeType: {
    type: STRING,
    allowNull: false,
    comment: '文件类型'
  },
  size: {
    type: STRING,
    allowNull: false,
    comment: '文件大小',
  }
})
