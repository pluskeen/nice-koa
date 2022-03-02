import Router from 'koa-router';
import validator from '../middleware/validator';
import loginCheck from '../middleware/login-check'
import { userValidate } from '../validator/user';
import { isExist, login, logout, register } from '../controller/user';
import { DefaultContext, DefaultState } from 'koa';

const router = new Router<DefaultState, DefaultContext>();

router.prefix('/api/users')

router.post('/register', validator(userValidate), async (ctx) => {
  const {userName, password} = ctx.request.body
  ctx.body = await register({userName, password})
})

router.post('/isExist', async (ctx) => {
  const {userName} = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/login', async (ctx) => {
  const {userName, password} = ctx.request.body
  ctx.body = await login({ctx, userName, password})
})

router.post('/logout', loginCheck(), async (ctx) => {
  ctx.body = await logout(ctx)
})

// router.post('/delete', loginCheck(), async (ctx, next) => {
//   // 测试环境下，用户登录后，可以删除自己
//   if (isTest) {
//     const {userName} = ctx.session.userInfo
//     ctx.body = await deleteCurUser(userName)
//   }
// })
//
// router.patch('/changePassword', loginChecks, genValidator(userValidate), async (ctx, next) => {
//   const {password, newPassword} = ctx.request.body
//   const {userName} = ctx.session.userInfo
//   ctx.body = await changePassword({userName, password, newPassword})
// })

export default router;
