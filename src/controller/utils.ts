import { ISaveFile } from '../type';
import fse from 'fs-extra';
import path from 'path';
import { MAX_FILE_SIZE } from '../config/constants';
import { ErrorInfo } from '../model/response.config';
import { ErrorModel, SuccessModel } from '../model/res-model';

const ROOT_FILE_PATH = path.join(__dirname, '..', '..', 'files')

// 是否需要创建目录
// fse.pathExists(ROOT_FILE_PATH).then(exists => {
//   if (!exists) {
//     // 创建目录
//     fse.ensureDir(ROOT_FILE_PATH).then();
//   }
// })

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
 * @param type 文件类型
 * @param name 文件名称
 * @param filePath 文件路径
 */
async function saveFile({size, type, originName, filePath}: ISaveFile) {
  if (size > MAX_FILE_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(ErrorInfo.uploadFileSizeFailInfo)
  }

  // 移动文件
  const fileName = Date.now() + '-' + originName // 防止重名
  const distFilePath = path.join(ROOT_FILE_PATH, fileName) // 文件目的地
  await fse.move(filePath, distFilePath)

  return new SuccessModel({url: '/' + fileName})
}

export {
  saveFile
}
