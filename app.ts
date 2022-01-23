import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaStatic from 'koa-static';

import crossOrigin from './src/middleware/cross-origin';
import uploadParser from './src/middleware/upload-parser';

import index from './src/route'
import users from './src/route/users'
import utils from './src/route/utils';

import { MAX_FILE_SIZE } from './src/config/constants';
import { writeLogError, writeLogInfo } from './src/config/log4js.config';

import { longNewDate } from './src/utils';
import path from 'path';

const app = new Koa()

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(uploadParser({
  maxFieldsSize: MAX_FILE_SIZE
}))
app.use(crossOrigin({
  origin: '*'
}))
app.use(json())

// koa 提供的 logger
app.use(logger(((str, args) => {
  console.log(longNewDate() + str);
  const txt = args.filter((c, i) => i !== 0).join(' ');
  writeLogInfo(txt);
})))

app.use(koaStatic(__dirname + '/public'))
// 上传资源文件夹
app.use(koaStatic(path.join(__dirname, '..', 'files')))

// 原生logger
// app.use(async (ctx, next) => {
//   const start = new Date().getTime()
//   await next()
//   const ms = new Date().getTime() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes()).use(index.allowedMethods())
app.use(users.routes()).use(users.allowedMethods())
app.use(utils.routes()).use(utils.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  writeLogError(err);
});

export default app;
