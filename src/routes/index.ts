import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  console.log(ctx.req);
  ctx.body = 'koa2 hello'
})

router.get('/string', async (ctx) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

export default router;
