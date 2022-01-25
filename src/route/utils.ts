import Router from 'koa-router';
import { DefaultContext, DefaultState } from 'koa';
import { FILE_UPLOAD_FIELDS } from '../constant';
import { saveFile } from '../controller/utils';

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
      ctx.body = '暂未支持多文件解析';
    }
  } else {
    ctx.body = '未获取到文件信息';
  }

})

export default router;
