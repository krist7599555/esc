import _ from 'lodash';
import compose from 'koa-compose';
import Router from 'koa-router';
import { _ensureTicket, _haveRole } from '../users/util';
import { ObjectId } from 'koa-mongo';
import dayjs from 'dayjs'

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
  console.log("TCL: ctx.request.body", ctx.request.body)
  console.log("TCL: ctx.request.body", ctx.params.id)
  const curr = await ctx.rooms.findOneAndUpdate(
    { _id: ObjectId(ctx.params.id) },
    { $set: { status } },
    { returnNewDocument: true }
  );
  console.log("TCL: curr", curr)
  ctx.assert(curr.ok, 404, "Not Found Room to Update");
  ctx.body = curr.value
};

async function getRoomsByDate(ctx: Context) {
  const today = dayjs().startOf('day')
  const dates = _.range(0, 7).map(nm => today.add(nm, 'day').format('YYYY-MM-DD'))
  console.log("TCL: getRoomsByDate -> dates", dates)
  
  const raw = await ctx.rooms
  .find({ date: {$in: dates}})
  .toArray()
  const grp = _.groupBy(raw, 'date')
  ctx.body = dates.map(date => ({
    date,
    value: _.get(grp, date, [])
  }))
}

export default new Router()
  .prefix('/rooms')
  .get('/', getRooms)
  .get('/byDate', getRoomsByDate)
  .use(_ensureTicket())
  .post('/', createRooms)
  .patch('/:id', updateRooms);
