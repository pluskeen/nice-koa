import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaStatic from 'koa-static';
import session, { SessionStore } from 'koa-generic-session';
import redisStore from 'koa-redis';

import crossOrigin from './middleware/cross-origin';
import fileParser from './middleware/file-parser';

import index from './route'
import users from './route/users'
import utils from './route/utils';
import error from './route/error';

import { MAX_FILE_SIZE } from './constant';
import { writeLogError, writeLogInfo } from './config/log4js.config';

import { longNewDate } from './utils';
import path from 'path';
import { REDIS_CONF, SESSION_SECRET_KEY } from './config/db.config';

const app = new Koa()

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(fileParser({
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

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'nice.sid', // cookie name 默认是 ‘koa.sid’
    prefix: 'nice:sess:', // redis key 的前缀，默认是 ‘koa:sess:’
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 1000 // 单位毫秒
    },
    store: redisStore({
      host: REDIS_CONF.host,
      port: REDIS_CONF.port,
      password: REDIS_CONF.password,
    } as redisStore.RedisOptions) as unknown as SessionStore
  })
)

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
