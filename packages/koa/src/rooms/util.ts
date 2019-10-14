import _ from 'lodash';

const roomsList = {
  pj3: {},
  pj4: {},
  pj5: {},
  esc: {},
  big: {}
};
const _roomSchema = () => (ctx, next) => {
  const body = ctx.request.body;
  body.title = body.title || 'undefined title';
  body.description = body.description || 'undefined description';
  body.start = new Date(body.start);
  body.end = new Date(body.end);
  body.room = body.room;

  ctx.assert(!isNaN(body.start), 400, 'start time not valid');
  ctx.assert(!isNaN(body.end), 400, 'end time not valid');
  ctx.assert(body.room in roomsList, 400, `room not in ${_.keys(roomsList)}`);
  ctx.state.body = body;
  return next();
};

module.exports = {
  roomsList,
  _roomSchema
};
