const cors = require('koa2-cors');
// const mongo = require('koa-mongo');
// const mongo = require('./mongo');
const mongo = require('koa-mongo');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const jwt = require('koa-jwt');
const Koa = require('koa');

const { normalizeError } = require('./middleware');

const Router = require('koa-router');
const users = require('./users');
const roomReservations = require('./roomReservations');

process.env.JWT_SECRET = 'jwt secret';

const api = new Router()
  .prefix('/api')
  .get('/', ctx => (ctx.body = 'This is ESC api'))
  .use(users.routes())
  .use(users.allowedMethods())
  .use(roomReservations.routes())
  .use(roomReservations.allowedMethods());

require('./passport');

const app = new Koa();
app.keys = [process.env.JWT_SECRET];
app
  .use(session({}, app))
  .use(passport.initialize())
  .use(passport.session());

module.export = app
  .use(cors())
  .use(logger())
  .use(bodyparser())
  // .use(mongo.default)
  .use(mongo({ db: 'esc' }))
  // .use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }))
  .use(normalizeError())
  .use((ctx, next) => {
    ctx.users = ctx.db.collection('users');
    ctx.rooms = ctx.db.collection('rooms');
    ctx.posts = ctx.db.collection('posts');
    ctx.roomReservations = ctx.db.collection('roomReservations');
    return next();
  })
  .use(api.routes())
  .use(api.allowedMethods())
  .listen(3000, () => {
    console.log('API is on http://0.0.0.0:3000');
  });
