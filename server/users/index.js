const Router = require('koa-router');
const sso = require('./sso');
const jwt = require('jsonwebtoken');
const compose = require('koa-compose');
const passport = require('koa-passport');
const _ = require('lodash');

const login = compose([
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
    ctx.body = jwt.sign(_.pick(user, field), process.env.JWT_SECRET, { expiresIn: '1d' });
  }
]);

const logout = compose([
  passport.authenticate('jwt'),
  async ctx => {
    ctx.asserts(ctx.isAuthenticated(), 401);
    const ticket = ctx.state.user.ticket;
    await sso.logout(ticket);
    await ctx.users.updateOne({ ticket }, { $unset: { ticket: '' } });
    ctx.body = 'success logout';
  }
]);

const getProfile = compose([
  passport.authenticate('jwt'),
  async ctx => {
    ctx.asserts(ctx.isAuthenticated(), 401);
    ctx.body = ctx.state.user;
  }
]);

const setProfile = compose([
  passport.authenticate('jwt'),
  async ctx => {
    ctx.asserts(ctx.isAuthenticated(), 401);
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
