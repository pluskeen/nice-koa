import { ISaveFile } from '../type';
import fse from 'fs-extra';
import path from 'path';
import { MAX_FILE_SIZE } from '../config/constants';
import { ErrorInfo } from '../model/error-info';

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exists => {
  if (!exists) {
    // 创建目录
    fse.ensureDir(DIST_FOLDER_PATH).then();
  }
})

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
    return {error: ErrorInfo.uploadFileSizeFailInfo}
  }

  // 移动文件
  const fileName = Date.now() + '-' + originName // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 文件目的地
  await fse.move(filePath, distFilePath)

  return {url: '/' + fileName}
}

export {
  saveFile
}
