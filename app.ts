import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaStatic from 'koa-static';

import crossOrigin from './src/middleware/cross-origin';
import uploadParser from './src/middleware/upload-parser';

import index from './src/routes'
import users from './src/routes/users'
import { MAX_FILE_SIZE } from './src/config/constants';

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
app.use(logger())
app.use(koaStatic(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes()).use(index.allowedMethods())
app.use(users.routes()).use(users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app;
