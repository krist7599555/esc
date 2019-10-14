"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var sso = _interopRequireWildcard(require("./sso"));

var _lodash = _interopRequireDefault(require("lodash"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _util = require("./util");

var login =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var _ctx$request$body, username, password, ticket, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password;
            ctx.assert(username, 400, 'require username');
            ctx.assert(password, 400, 'require password');
            _context.next = 5;
            return sso.login(username, password);

          case 5:
            ticket = _context.sent;
            _context.next = 8;
            return sso.validate(ticket);

          case 8:
            user = _context.sent;
            ctx.cookies.set('ticket', ticket, {
              httpOnly: true
            });
            _context.next = 12;
            return ctx.users.findOneAndUpdate({
              ticket: ticket
            }, {
              $set: user
            }, {
              upsert: true,
              returnOriginal: false
            });

          case 12:
            ctx.body = _context.sent;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x) {
    return _ref.apply(this, arguments);
  };
}();

var logout =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    var ticket;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ticket = ctx.cookies.get('ticket');
            _context2.next = 3;
            return sso.logout(ticket)["catch"](function (e) {});

          case 3:
            _context2.next = 5;
            return ctx.users.updateOne({
              ticket: ticket
            }, {
              $unset: {
                ticket: ''
              }
            });

          case 5:
            ctx.cookies.set('ticket', null, {
              httpOnly: true
            });
            ctx.status = 204;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function logout(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getProfile = function getProfile(ctx) {
  ctx.body = ctx.state.user;
};

var setProfile =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(ctx) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return ctx.users.updateOne({
              ticket: ctx.cookies.get('ticket')
            }, {
              $set: _lodash["default"].omit(ctx.request.body, ['ticket', 'ouid'])
            }, {
              upsert: false
            });

          case 2:
            ctx.status = 204;

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function setProfile(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = new _koaRouter["default"]().post('/login', login).use((0, _util._ensureTicket)()).all('/logout', logout).get('/profile', getProfile).post('/profile', setProfile);

exports["default"] = _default;