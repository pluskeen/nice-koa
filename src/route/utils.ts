import Router from 'koa-router';
import { DefaultContext, DefaultState } from 'koa';
import { FILE_UPLOAD_FIELDS } from '../constant';
import { getFilePath, multiFile, removeFile, saveFile } from '../controller/file';
import { ErrorModel } from '../response/response.class';
import { ErrorInfo } from '../response/response.config';

const router = new Router<DefaultState, DefaultContext>();

router.prefix('/api/utils')

// 上传图片
router.post('/upload', async (ctx) => {
  if (ctx.req.files) {
    const file = ctx.req.files[FILE_UPLOAD_FIELDS]

    if (!Array.isArray(file)) {
      // console.log(file)
      const {
              size,
              originalFilename: originName,
              mimetype: mimeType,
              filepath: filePath,
              newFilename: newName
            } = file
      ctx.body = await saveFile({size, mimeType, originName, newName, filePath})
    } else {
      ctx.body = await multiFile();
    }
  } else {
    ctx.body = new ErrorModel(ErrorInfo.unableReadFileInfo);
  }
})

// 获取文件地址
router.get('/file_path/:fileId', async (ctx) => {
  const fileId = ctx.params.fileId
  ctx.body = await getFilePath(fileId)
})

// 删除文件
router.get('/delete_file/:fileId', async (ctx) => {
  const fileId = ctx.params.fileId
  ctx.body = await removeFile(fileId)
})

export default router;
