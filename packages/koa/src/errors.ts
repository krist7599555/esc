module.exports = (ctx, next) => {
  return next().catch(err => {
    if (typeof err == 'string') {
      ctx.throw(500, err);
    } else if (err.message) {
      ctx.throw(err.status || 400, err.message);
    } else {
      throw err;
    }
  });
};
