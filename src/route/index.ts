import Router from 'koa-router';
import { DefaultContext, DefaultState } from 'koa';

const router = new Router<DefaultState, DefaultContext>();

router.prefix('/api')

router.get('/', async (ctx) => {
  ctx.body = 'koa2 hello'
})

router.get('/string', async (ctx) => {
  ctx.body = 'koa2 string'
})

router.post('/json', async (ctx) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

export default router;
