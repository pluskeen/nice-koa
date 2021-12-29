import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

import index from './src/routes'
import users from './src/routes/users'

const app = new Koa()

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

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
