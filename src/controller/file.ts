import { ISaveFile } from '../type';
import fse from 'fs-extra';
import path from 'path';
import { MAX_FILE_SIZE } from '../constant';
import { ErrorInfo } from '../response/response.config';
import { ErrorModel, SuccessModel } from '../response/response.class';
import { newDate } from '../utils';
import { deleteFile, getFileInfo, storageFile } from '../service/file';
import { IFileCreationAttributes } from '../database/model';

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

/** 保存文件 */
export async function saveFile({size, mimeType, originName, newName, filePath}: ISaveFile) {
  if (size > MAX_FILE_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(ErrorInfo.uploadFileSizeFailInfo)
  }

  const fileExt = originName.substring(originName.lastIndexOf('.') + 1);
  const fileName = newName + '.' + fileExt;

  // 创建文件目录
  const dirPath = path.join(newDate(), fileExt);
  const dirPathWithRoot = path.join(ROOT_FILE_PATH, dirPath);
  await mkdir(dirPathWithRoot);
  // 文件目的地
  const distFilePath = path.join(dirPath, fileName);
  const distFilePathWithRoot = path.join(dirPathWithRoot, fileName);

  // 文件信息入库
  const fileInfo = await storageFile({
    fileId: newName,
    path: distFilePath,
    fileName,
    originName,
    size,
    mimeType
  });

  try {
    // 移动文件
    await fse.move(filePath, distFilePathWithRoot)
  } catch (e) {
    console.error(e)
    await fse.remove(filePath)
    await deleteFile(fileInfo.fileId)
    return new ErrorModel(ErrorInfo.saveFileFailInfo)
  }
  return new SuccessModel({url: distFilePath})
}

/** 删除文件 */
export async function removeFile(fileId: IFileCreationAttributes['fileId']) {
  const {result, info} = await deleteFile(fileId)
  if (result) {
    await fse.remove(path.join(ROOT_FILE_PATH, info.path))
    return new SuccessModel()
  }
  return new ErrorModel(ErrorInfo.deleteFileFailInfo)
}

/** 保存多个文件 */
export async function multiFile() {
  // 暂不支持
  return new ErrorModel(ErrorInfo.saveMultiFileFailInfo)
}

/** 获取文件地址 */
export async function getFilePath(fileId: IFileCreationAttributes['fileId']) {
  const result = await getFileInfo(fileId)
  if (result) {
    return new SuccessModel({path: result.path})
  }
  return new ErrorModel(ErrorInfo.unableReadFileInfo)
}
