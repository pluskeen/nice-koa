import Router from 'koa-router';

const router = new Router();

router.prefix('/api/error')

// error 路由
router.get('/404', async (ctx) => {
  ctx.body = 'error';
})

export default router;
