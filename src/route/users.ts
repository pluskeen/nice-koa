import Router from 'koa-router';
import validator from '../middleware/validator';
import { userValidate } from '../validator/user';
import { isExist, register } from '../controller/user';

const router = new Router();

router.prefix('/api/users')

router.post('/register', validator(userValidate), async (ctx) => {
  const {userName, password} = ctx.request.body
  ctx.body = await register({userName, password})
})

router.post('/isExist', async (ctx) => {
  const {userName} = ctx.request.body
  ctx.body = await isExist(userName)
})

export default router;
