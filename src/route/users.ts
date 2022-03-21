import Router from 'koa-router';
import validator from '../middleware/validator';
import loginCheck from '../middleware/login-check'
import { userValidate } from '../validator/user';
import { changePassword, changeUserInfo, deleteCurrUser, isExist, login, logout, register } from '../controller/user';
import { DefaultContext, DefaultState } from 'koa';

const router = new Router<DefaultState, DefaultContext>();

router.prefix('/api/users')

router.post('/register', validator(userValidate), async (ctx) => {
  const {userName, password, gender} = ctx.request.body
  ctx.body = await register({userName, password, gender})
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

router.post('/delete', loginCheck(), async (ctx) => {
  const {id} = ctx.session.userInfo
  ctx.body = await deleteCurrUser(ctx, id)
})

router.post('/changePassword', loginCheck(), validator(userValidate), async (ctx) => {
  const {password, newPassword} = ctx.request.body
  const {id} = ctx.session.userInfo
  ctx.body = await changePassword({ctx, id, password, newPassword})
})

router.post('/changeUserInfo', loginCheck(), validator(userValidate), async (ctx) => {
  const {gender} = ctx.request.body
  const {id} = ctx.session.userInfo
  ctx.body = await changeUserInfo({id, gender})
})

export default router;
