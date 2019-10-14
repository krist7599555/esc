import _ from 'lodash';
import compose from 'koa-compose';
import Router from 'koa-router';
import { _ensureTicket, _haveRole } from '../users/util';
import { ObjectId } from 'koa-mongo';
import { Context } from 'koa';
import { Room } from '../types/room';
import dayjs from 'dayjs';
const getRooms = async (ctx: Context) => {
  const { start, end, owner } = ctx.query;
  ctx.body = await ctx.rooms
    .find({
      owner: owner || { $exists: true },
      start: start ? { $gte: dayjs(start).toDate() } : { $exists: true },
      end: end ? { $lte: dayjs(end).toDate() } : { $exists: true }
    })
    .toArray();
};

const createRooms = async (ctx: Context) => {
  const b = ctx.request.body;
  ctx.assert(b.start, 400, `start time not valid "${b.start}"`);
  ctx.assert(b.end, 400, `end time not valid "${b.end}"`);
  ctx.assert(b.room, 400, `require room`);
  const body: Room = {
    ...b,
    start: dayjs(b.start).toDate(),
    end: dayjs(b.end).toDate(),
    owner: ctx.state.user.ouid,
    status: 'waiting',
    editor: null
  };
  const { insertedId } = await ctx.rooms.insertOne({ ...body, owner: ctx.state.user.ouid });
  ctx.body = { _id: insertedId, ...body };
};

const updateRooms = async (ctx: Context) => {
  ctx.assert(!_.isEmpty(ctx.request.body), 400, 'body is empty.');
  const status = ctx.request.body.status;
  ctx.assert(status, 400, 'field "status" is empty.');
  ctx.assert(['approved', 'rejected', 'waiting'].includes(status), 400, '"status" is not match.');
  const { value, ok } = await ctx.rooms.findOneAndUpdate(
    { _id: ObjectId(ctx.params.id) },
    { $set: { status, editor: ctx.state.user.ouid } },
    { upsert: false, returnOriginal: false }
  );
  ctx.assert(value, 404, 'not found record to update');
  ctx.body = value;
};

const deleteRooms = async (ctx: Context) => {
  const { value, ok } = await ctx.rooms.findOneAndDelete({ _id: ObjectId(ctx.params.id) });
  ctx.assert(value, 404, 'not found record to delete');
  ctx.body = value;
};

export default new Router()
  .prefix('/rooms')
  .get('/', getRooms)
  .use(_ensureTicket())
  .post('/', createRooms)
  .patch('/:id', updateRooms)
  .delete('/:id', deleteRooms);
