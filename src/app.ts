import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaStatic from 'koa-static';

import crossOrigin from './middleware/cross-origin';
import uploadParser from './middleware/upload-parser';

import index from './route'
import users from './route/users'
import utils from './route/utils';
import error from './route/error';

import { MAX_FILE_SIZE } from './constant';
import { writeLogError, writeLogInfo } from './config/log4js.config';

import { longNewDate } from './utils';
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
  origin: '127.0.0.1'
}))
app.use(json())

// koa 提供的 logger
app.use(logger(((str, args) => {
  console.log(longNewDate() + str);
  const txt = args.filter((c, i) => i !== 0).join(' ');
  writeLogInfo(txt);
})))

app.use(koaStatic(path.join(__dirname, './public')))
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
app.use(error.routes()).use(error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  writeLogError(err);
});

export default app;
