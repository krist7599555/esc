const compose = require('koa-compose');
const passport = require('koa-passport');
const Router = require('koa-router');
const _ = require('lodash');

const getRooms = async ctx => {
  let { start, end } = ctx.query;
  start = parseInt(start);
  end = parseInt(end);
  console.log(start, end)
  // console.log(new Date(parseInt(start)), new Date(parseInt(end)))
  console.log(new Date(start), new Date(end));
  ctx.body = await ctx.rooms
    .find({
      $and: [
        {start: { $lt: (end ? new Date(end) : new Date())}},
        {end: { $gt: (start ? new Date(start) : new Date())}},
      ],
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
