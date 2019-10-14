"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.validate = validate;
exports.logout = logout;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _axios = _interopRequireDefault(require("axios"));

var _faculty = _interopRequireDefault(require("./faculty"));

var _qs = _interopRequireDefault(require("qs"));

var SSO_URL = 'https://account.it.chula.ac.th';

var SSO_KILL = function SSO_KILL(ticket) {
  return "".concat(SSO_URL, "/resources/tickets/").concat(ticket);
};

var SSO_LOGIN = function SSO_LOGIN() {
  return "".concat(SSO_URL, "/login");
};

var SSO_USER = function SSO_USER() {
  return "".concat(SSO_URL, "/resources/users/me");
};

function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(username, password) {
    var res, cookie, DeeTGT;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _axios["default"].get(SSO_LOGIN(), {
              withCredentials: true,
              params: {
                username: username.slice(0, 8),
                password: password,
                service: 'https://account.it.chula.ac.th/html',
                serviceName: 'Chula+SSO'
              }
            });

          case 2:
            res = _context.sent;

            if (!(_lodash["default"].get(res.data, 'type') == 'error')) {
              _context.next = 5;
              break;
            }

            throw new Error(_lodash["default"].get(res.data, 'content', 'SSO login error'));

          case 5:
            cookie = _lodash["default"].get(res.headers, "['set-cookie'][0]");
            DeeTGT = _lodash["default"].get(_qs["default"].parse(cookie), 'DeeTGT');
            return _context.abrupt("return", DeeTGT);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _login.apply(this, arguments);
}

function validate(_x3) {
  return _validate.apply(this, arguments);
}

function _validate() {
  _validate = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ticket) {
    var raw, facultyNUM, year;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _axios["default"].get(SSO_USER(), {
              headers: {
                'accept-encoding': 'gzip;q=0,deflate,sdch',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
                Cookie: "DeeTGT=".concat(ticket)
              }
            }).then(function (res) {
              return res.data;
            });

          case 2:
            raw = _context2.sent;
            facultyNUM = raw.ouid.slice(-2);
            year = raw.ouid.slice(0, 2);
            return _context2.abrupt("return", {
              ticket: ticket,
              ouid: raw.ouid,
              // pwid: encrypt(password),
              // titleTH: null,
              // titleEN: null,
              nameTH: raw.firstnameTH,
              nameEN: raw.firstname,
              surnameTH: raw.lastnameTH,
              surnameEN: raw.lastname,
              facultyNUM: +facultyNUM,
              facultyTH: _faculty["default"][facultyNUM].nameTH,
              facultyEN: _faculty["default"][facultyNUM].nameEN,
              facultyABBR: _faculty["default"][facultyNUM].nameABBR,
              year: +year
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _validate.apply(this, arguments);
}

function logout(ticket) {
  return _axios["default"]["delete"](SSO_KILL(ticket)).then(function (res) {
    return res.data;
  });
}