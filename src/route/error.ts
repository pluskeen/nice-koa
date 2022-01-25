import Router from 'koa-router';

const router = new Router();

// error 路由
router.get('/error', async (ctx) => {
  ctx.body = 'error';
})

export default router;
