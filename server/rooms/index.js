const compose = require('koa-compose');
const passport = require('koa-passport');
const Router = require('koa-router');
const _ = require('lodash');

const getRooms = async ctx => {
  const { start, end } = ctx.query;
  ctx.body = await ctx.roomReservations
    .find({
      start: start ? { $gtr: new Date(start) } : { $exists: true },
      end: end ? { $lte: new Date(end) } : { $exists: true }
    })
    .toArray();
};

const roomsSchema = field => (ctx, next) => {
  const body = ctx.request.body;
  body.title = body.title || 'undefined title';
  body.start = new Date(body.start);
  body.end = new Date(body.end);
  body.rooms = _.sortedUniq(body.rooms);
  // body.status = ['waiting', 'approved', 'rejected'];
  ctx.state[field] = {
    title: body.title,
    start: body.start,
    end: body.end,
    rooms: body.rooms,
    create: new Date(),
    createBy: ctx.state.user.ouid
  };
  console.log(ctx.state[field]);
  return next();
};

const createRooms = compose([
  passport.authorize('jwt'),
  roomsSchema('rooms'),
  async ctx => {
    ctx.assert(ctx.isAuthenticated(), 401);
    ctx.assert(ctx.state.user, 401);
    ctx.status = 201;

    console.log('TCL: ctx.state.rooms', ctx.state.rooms);
    return await ctx.rooms.insertOne(
      {
        ...ctx.state.rooms,
        history: [ctx.state.rooms]
      },
      {}
    );
  }
]);

module.exports = new Router()
  .prefix('/rooms')
  .get('/', getRooms)
  .post('/', createRooms);
