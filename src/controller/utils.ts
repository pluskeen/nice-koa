import { ISaveFile } from '../type';
import fse from 'fs-extra';
import path from 'path';
import { MAX_FILE_SIZE } from '../constant';
import { ErrorInfo } from '../model/response.config';
import { ErrorModel, SuccessModel } from '../model/res-model';
import { newDate } from '../utils';

const ROOT_FILE_PATH = path.join(__dirname, '..', '..', 'files')

mkdir(ROOT_FILE_PATH).then();

/**
 * 创建存放文件的根目录
 */
async function mkdir(path: string) {
  fse.pathExists(path).then(exists => {
    if (!exists) {
      // 创建目录
      fse.ensureDir(path).then();
    }
  })
}

/**
 * 保存文件
 * @param size 文件大小
 * @param mimeType 文件类型
 * @param originName 文件原名称
 * @param newName 文件新名称
 * @param filePath 文件路径
 */
async function saveFile({size, mimeType, originName, newName, filePath}: ISaveFile) {
  if (size > MAX_FILE_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(ErrorInfo.uploadFileSizeFailInfo)
  }

  const fileExt = originName.substring(originName.lastIndexOf('.') + 1);
  const fileName = newName + '.' + fileExt;
  // 创建文件目录
  const dirPath = path.join(ROOT_FILE_PATH, newDate(), fileExt);
  await mkdir(dirPath);
  // 移动文件
  const distFilePath = path.join(dirPath, fileName);  // 文件目的地
  await fse.move(filePath, distFilePath)
  return new SuccessModel({url: '/' + fileName})
}

export {
  saveFile
}
