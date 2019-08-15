const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('passport-jwt');
const { Base64 } = require('js-base64');

const sso = require('./users/sso');

passport.serializeUser(function(req, user, done) {
  done(null, user.ouid);
});

passport.deserializeUser(function(req, user_id, done) {
  done(null, { id: user_id });
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true, session: false },
    async (req, username, password, done) => {
      console.log('hello');
      const fnd = await req.ctx.users.findOne({ ouid: username });
      if (fnd && fnd.pwid == Base64.encode(password)) {
        return done(null, fnd, { message: 'success from db' });
      }
      try {
        const ticket = await sso.login(username, password);
        const user = await sso.validate(ticket);
        const user2 = await req.ctx.users.findOneAndUpdate(
          { ouid: user.ouid },
          { $set: { ...user, ticket, pwid: Base64.encode(password) } },
          { upsert: true }
        );
        return done(null, user2, { message: 'success from sso' });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new jwt.Strategy(
    {
      // jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: req => req.ctx.cookies.get('jwt'),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true
    },
    async (req, payload, done) => {
      const user = await req.ctx.users.findOne({ ticket: payload.ticket });
      if (user) {
        return await done(null, (req.ctx.state.user = user));
      } else {
        return await done(null, false, { message: 'no session found', status: 401 });
      }
    }
  )
);
