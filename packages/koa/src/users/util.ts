const _ = require('lodash');

const _ensureTicket = () => async (ctx, next) => {
  const ticket = ctx.state.user.ticket;
  ctx.assert(ticket, 401, 'no ticket in cookies. please re-login');
  const user = await ctx.users.findOne({ ticket });
  ctx.assert(user, 401, 'you are login on another device. please re-login');
  ctx.assert(user.ouid, 500, 'user have no ouid, please-contact admin');
  ctx.state.user = user;
  await next();
};

const _haveRole = field => async (ctx, next) => {
  const roles = ctx.state.user.roles || [];
  ctx.assert(_.includes(roles, field), 401, 'you are not admin');
  await next();
};

export { _ensureTicket, _haveRole };
