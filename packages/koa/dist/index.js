"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _users = _interopRequireDefault(require("./users"));

var _rooms = _interopRequireDefault(require("./rooms"));

var _dayjs = _interopRequireDefault(require("dayjs"));

_dayjs["default"].locale('th');

var api = new _koaRouter["default"]().prefix('/api').all('/', function (ctx) {
  return ctx.body = 'This is ESC api';
}).use(_users["default"].routes()).use(_users["default"].allowedMethods()).use(_rooms["default"].routes()).use(_rooms["default"].allowedMethods());
var app = new _koa["default"]();

var _default = app.use(require('koa2-cors')()).use(require('koa-logger')()).use(require('koa-bodyparser')()).use(require('koa-mongo')({
  db: 'esc'
})).use(require('./errors')).use(function (ctx, next) {
  ctx.users = ctx.db.collection('users');
  ctx.rooms = ctx.db.collection('rooms');
  ctx.posts = ctx.db.collection('posts');
  return next();
}).use(api.routes()).use(api.allowedMethods()).listen(3000, function () {
  console.log('API is on http://0.0.0.0:3000');
});

exports["default"] = _default;