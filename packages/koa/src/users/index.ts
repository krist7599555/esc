import * as sso from './sso';
import _ from 'lodash';
import compose from 'koa-compose';
import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
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
  ctx.body = await ctx.users.findOneAndUpdate(
    { ticket },
    { $set: user },
    { upsert: true, returnOriginal: false }
  );
};

const logout = async (ctx: Context) => {
  const ticket = ctx.cookies.get('ticket');
  await sso.logout(ticket).catch(e => {});
  await ctx.users.updateOne({ ticket }, { $unset: { ticket: '' } });
  ctx.cookies.set('ticket', null, { httpOnly: true });
  ctx.status = 204;
};

const getProfile = ctx => {
  ctx.body = ctx.state.user;
};

const setProfile = async (ctx: Context) => {
  await ctx.users.updateOne(
    { ticket: ctx.cookies.get('ticket') },
    { $set: _.omit(ctx.request.body, ['ticket', 'ouid']) },
    { upsert: false }
  );
  ctx.status = 204;
};

export default new Router()
  .post('/login', login)
  .use(_ensureTicket())
  .all('/logout', logout)
  .get('/profile', getProfile)
  .post('/profile', setProfile);
