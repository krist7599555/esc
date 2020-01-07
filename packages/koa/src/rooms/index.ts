import _ from 'lodash';
import compose from 'koa-compose';
import Router from 'koa-router';
import { _ensureTicket, _haveRole } from '../users/util';
import { ObjectId } from 'koa-mongo';

const getRooms = async ctx => {
  const { start, end, ouid } = ctx.query;
  ctx.body = await ctx.rooms
    .find({
      // ouid: ouid || { $exists: true },
      // start: start ? { $gtr: new Date(start) } : { $exists: true },
      // end: end ? { $lte: new Date(end) } : { $exists: true }
    })
    .toArray();
};

const createRooms = async ctx => {
  await ctx.rooms.insertOne({
    ...ctx.request.body,
    owner: ctx.state.user.ouid,
    status: "waiting"
  });
  ctx.status = 204;
};

const updateRooms = async ctx => {
  const { status } = ctx.request.body;
  const curr = await ctx.rooms.findOne({ _id: ObjectId(ctx.params.id) });
  ctx.assert(curr, 404, "Not Found Room to Update");

};

export default new Router()
  .prefix('/rooms')
  .get('/', getRooms)
  .use(_ensureTicket())
  .post('/', createRooms)
  .patch('/:id', updateRooms);
