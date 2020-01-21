import * as sso from './sso';
import _ from 'lodash';
import compose from 'koa-compose';
import jwt from 'jsonwebtoken';
import Router from 'koa-router';
import { Context } from 'koa';

import { _ensureTicket } from './util';

const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body;
  ctx.assert(username, 400, 'require username');
  ctx.assert(password, 400, 'require password');
  const ticket = await sso.login(username, password);
  const user = await sso.validate(ticket);
  ctx.cookies.set('ticket', ticket, { httpOnly: true });
  ctx.body = (await ctx.users.findOneAndUpdate(
    { _id: user.ouid },
    { $set: {...user, ticket} },
    { upsert: true, returnOriginal: false }
  )).value;
};

const logout = async (ctx: Context) => {
  const ticket = ctx.cookies.get('ticket');
  await sso.logout(ticket).catch(e => {});
  await ctx.users.updateOne({ ticket }, { $unset: { ticket: '' } });
  ctx.cookies.set('ticket', null, { httpOnly: true });
  ctx.body = 'logout success';
};

const getProfile = ctx => {
  ctx.body = ctx.state.user;
};

const setProfile = async (ctx: Context) => {
  ctx.assert(!_.isEmpty(ctx.request.body), 400, 'field is empty. You must specify a field');
  ctx.body = (await ctx.users.findOneAndUpdate(
    { ticket: ctx.cookies.get('ticket') },
    { $set: _.omit(ctx.request.body, ['ticket', 'ouid', '_id']) },
    { upsert: false, returnOriginal: false }
  )).value;
};

export default new Router()
  .post('/login', login)
  // .use((ctx, next) => {
  //   console.log('1')
  //   return next();
  //   console.log('2')
  // })
  .use(_ensureTicket())
  .all('/logout', logout)
  .get('/profile', getProfile)
  .patch('/profile', setProfile);
