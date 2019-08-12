const Router = require('koa-router');
const sso = require('./sso');
const jwt = require('jsonwebtoken');
const compose = require('koa-compose');
const passport = require('koa-passport');
const _ = require('lodash');

const login = compose([
  (ctx, next) => {
    ctx.assert(ctx.request.body.username, 400, 'require username');
    ctx.assert(ctx.request.body.password, 400, 'require password');
    return next();
  },
  passport.authenticate('local'),
  async ctx => {
    const user = ctx.state.user;
    const field = [
      'ticket',
      'ouid',
      'nameTH',
      'nameEN',
      'surnameTH',
      'surnameEN',
      'facultyNUM',
      'facultyTH',
      'facultyEN'
    ];

    const jwtCookie = jwt.sign(_.pick(user, field), process.env.JWT_SECRET, { expiresIn: '1d' });
    ctx.body = 'login success';
    ctx.cookies.set('jwt', jwtCookie, {
      httpOnly: true
    });
  }
]);

const logout = compose([
  passport.authenticate('jwt'),
  async ctx => {
    ctx.assert(ctx.isAuthenticated(), 401);
    const ticket = ctx.state.user.ticket;
    await sso.logout(ticket).catch(e => {});
    await ctx.users.updateOne({ ticket }, { $unset: { ticket: '' } });
    ctx.body = 'success logout';
  }
]);

const getProfile = compose([
  passport.authenticate('jwt'),
  async ctx => {
    ctx.assert(ctx.isAuthenticated(), 401);
    ctx.body = ctx.state.user;
  }
]);

const setProfile = compose([
  passport.authenticate('jwt'),
  async ctx => {
    ctx.assert(ctx.isAuthenticated(), 401);
    await ctx.users.updateOne(
      { ticket: ctx.state.user.ticket },
      { $set: ctx.request.body },
      { upsert: false }
    );
  }
]);

module.exports = new Router()
  .get('/login', ctx => (ctx.body = 'must be POST'))
  .post('/login', login)
  .all('/logout', logout)
  .get('/profile', getProfile)
  .post('/profile', setProfile);
