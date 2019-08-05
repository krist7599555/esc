const Router = require('koa-router');

const roomReservations = {
  get: async ctx => {
    const { startTime, endTime } = ctx.query;
    ctx.body = await ctx.roomReservations
      .find({
        startTime: startTime ? { $gtr: new Date(startTime) } : { $exists: true },
        endTime: endTime ? { $lte: new Date(endTime) } : { $exists: true }
      })
      .toArray();
  },
  set: async ctx => {
    const { startTime, endTime, title, room, status } = ctx.request.body;
    const user = await ctx.users.findOne({
      ticket: ctx.cookies.get('ticket')
    });
    await ctx.roomReservations.insertOne(
      {
        owner: user.ouid,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        room,
        status // "pending" | "approved" | "rejected"
      },
      {}
    );
    ctx.status = 201;
  }
};

module.exports = new Router()
  .get('/roomReservations', roomReservations.get)
  .post('/roomReservations', roomReservations.set);
