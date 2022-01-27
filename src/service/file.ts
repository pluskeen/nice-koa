import { FileModel, IFileCreationAttributes } from '../database/model';

/** 文件信息入库 */
export async function storageFile({fileId, path, fileName, mimeType, originName, size}: IFileCreationAttributes) {
  return await FileModel.create({
    fileId, path, fileName, mimeType, originName, size
  })
}

/** 删除文件 */
export async function deleteFile(fileId: IFileCreationAttributes['fileId']) {
  const info = await getFileInfo(fileId);
  // result 删除的行数
  const result = await FileModel.destroy({
    where: {
      fileId
    }
  })

  return {
    /** 被删文件的信息 */
    info,
    result: result > 0
  }
}

/** 获取文件地址 */
export async function getFileInfo(fileId: IFileCreationAttributes['fileId']) {
  // 查询
  const result = await FileModel.findOne({
    attributes: ['fileId', 'fileName', 'originName', 'size', 'path'],
    where: {fileId},
  })

  if (result === null) {
    // 未找到
    return result
  }

  return result;
}
