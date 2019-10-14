"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._haveRole = exports._ensureTicket = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ = require('lodash');

var _ensureTicket = function _ensureTicket() {
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(ctx, next) {
        var ticket, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ticket = ctx.state.user.ticket;
                ctx.assert(ticket, 401, 'no ticket in cookies. please re-login');
                _context.next = 4;
                return ctx.users.findOne({
                  ticket: ticket
                });

              case 4:
                user = _context.sent;
                ctx.assert(user, 401, 'you are login on another device. please re-login');
                ctx.assert(user.ouid, 500, 'user have no ouid, please-contact admin');
                ctx.state.user = user;
                _context.next = 10;
                return next();

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports._ensureTicket = _ensureTicket;

var _haveRole = function _haveRole(field) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(ctx, next) {
        var roles;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                roles = ctx.state.user.roles || [];
                ctx.assert(_.includes(roles, field), 401, 'you are not admin');
                _context2.next = 4;
                return next();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};

exports._haveRole = _haveRole;