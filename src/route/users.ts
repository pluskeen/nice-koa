import Router from 'koa-router';
import validator from '../middleware/validator';
import loginCheck from '../middleware/login-check'
import { changePassword, changeUserInfo, deleteCurrUser, isExist, login, logout, register } from '../controller/user';
import { DefaultContext, DefaultState } from 'koa';
import { validate } from '../config/ajv.config';
import { ESchema } from '../enum';

const router = new Router<DefaultState, DefaultContext>();

router.prefix('/api/users')

router.post('/register', validator(validate(ESchema.User)), async (ctx) => {
  const {userName, password, gender, language} = ctx.request.body
  ctx.body = await register({userName, password, gender, language})
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

router.post('/changePassword', loginCheck(), validator(validate(ESchema.User)), async (ctx) => {
  const {password, newPassword} = ctx.request.body
  const {id} = ctx.session.userInfo
  ctx.body = await changePassword({ctx, id, password, newPassword})
})

router.post('/changeUserInfo', loginCheck(), validator(validate(ESchema.User)), async (ctx) => {
  const {gender} = ctx.request.body
  const {id} = ctx.session.userInfo
  ctx.body = await changeUserInfo({id, gender})
})

export default router;
