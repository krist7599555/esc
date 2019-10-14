"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _util = require("../users/util");

var _koaMongo = require("koa-mongo");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getRooms =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var _ctx$query, start, end, ouid;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$query = ctx.query, start = _ctx$query.start, end = _ctx$query.end, ouid = _ctx$query.ouid;
            _context.next = 3;
            return ctx.rooms.find({
              ouid: ouid || {
                $exists: true
              },
              start: start ? {
                $gtr: new Date(start)
              } : {
                $exists: true
              },
              end: end ? {
                $lte: new Date(end)
              } : {
                $exists: true
              }
            }).toArray();

          case 3:
            ctx.body = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getRooms(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createRooms =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return ctx.rooms.insertOne(_objectSpread({
              ouid: ctx.state.user.ouid
            }, ctx.state.body));

          case 2:
            ctx.status = 204;

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createRooms(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var updateRooms =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(ctx) {
    var status, curr;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            status = ctx.request.body.status;
            curr = ctx.rooms.findOne({
              _id: (0, _koaMongo.ObjectId)(ctx.params.id)
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateRooms(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = new _koaRouter["default"]().prefix('/rooms').get('/', getRooms).use((0, _util._ensureTicket)()).post('/', createRooms).patch('/:id', updateRooms);

exports["default"] = _default;