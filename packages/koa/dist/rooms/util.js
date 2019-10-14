"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _lodash = _interopRequireDefault(require("lodash"));

var roomsList = {
  pj3: {},
  pj4: {},
  pj5: {},
  esc: {},
  big: {}
};

var _roomSchema = function _roomSchema() {
  return function (ctx, next) {
    var body = ctx.request.body;
    body.title = body.title || 'undefined title';
    body.description = body.description || 'undefined description';
    body.start = new Date(body.start);
    body.end = new Date(body.end);
    body.room = body.room;
    ctx.assert(!isNaN(body.start), 400, 'start time not valid');
    ctx.assert(!isNaN(body.end), 400, 'end time not valid');
    ctx.assert(body.room in roomsList, 400, "room not in ".concat(_lodash["default"].keys(roomsList)));
    ctx.state.body = body;
    return next();
  };
};

module.exports = {
  roomsList: roomsList,
  _roomSchema: _roomSchema
};