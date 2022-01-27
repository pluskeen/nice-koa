import { seq } from "../seq";
import { STRING, UNSIGNED_INT } from "../types";
import { Optional, Model } from 'sequelize';

interface IFileAttributes {
  id: number;
  fileId: string;
  path: string;
  fileName: string;
  originName: string;
  mimeType: string;
  size: number;
}

export interface IFileCreationAttributes extends Optional<IFileAttributes, 'id'> {}

export interface IFileInstance extends Model<IFileAttributes, IFileCreationAttributes>, IFileAttributes{}

// files 表
export const FileModel = seq.define<IFileInstance>('file', {
  id: {
    primaryKey: true,
    type: UNSIGNED_INT,
    autoIncrement: true,
  },
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
    type: UNSIGNED_INT,
    allowNull: false,
    comment: '文件大小',
  }
})
