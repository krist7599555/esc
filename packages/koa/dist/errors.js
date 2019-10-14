"use strict";

module.exports = function (ctx, next) {
  return next()["catch"](function (err) {
    if (typeof err == 'string') {
      ctx["throw"](500, err);
    } else if (err.message) {
      ctx["throw"](err.status || 400, err.message);
    } else {
      throw err;
    }
  });
};