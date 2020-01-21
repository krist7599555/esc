module.exports = (ctx, next) => {
  return next().catch(err => {
    if (typeof err == 'string') {
      ctx.throw(500, err);
    } else if (err.message) {
      console.error('A', err.message)
      console.error(err)
      ctx.throw(err.status || 400, err.message);
    } else {
      console.error('B', err.message)
      console.error(err)
      throw err;
    }
  });
};
