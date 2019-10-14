import Koa from 'koa';
import Router from 'koa-router';
import users from './users';
import rooms from './rooms';

import dayjs from 'dayjs';
dayjs.locale('th');

const api = new Router()
  .prefix('/api')
  .all('/', ctx => (ctx.body = 'This is ESC api'))
  .use(users.routes())
  .use(users.allowedMethods())
  .use(rooms.routes())
  .use(rooms.allowedMethods());

const app = new Koa<Koa.DefaultState, Koa.BaseContext>();

export default app
  .use(require('koa2-cors')())
  .use(require('koa-logger')())
  .use(require('koa-bodyparser')())
  .use(require('koa-mongo')({ db: 'esc' }))
  .use(require('./errors'))
  .use((ctx, next) => {
    ctx.users = ctx.db.collection('users');
    ctx.rooms = ctx.db.collection('rooms');
    ctx.posts = ctx.db.collection('posts');

    return next();
  })
  .use(api.routes())
  .use(api.allowedMethods())
  .listen(3000, () => {
    console.log('API is on http://0.0.0.0:3000');
  });
