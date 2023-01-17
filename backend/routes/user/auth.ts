import passport from 'passport';
import express from 'express';
import { mountRedirects } from '../../passport/redirects';

const auth = express.Router();

passport.serializeUser((user: Express.User, cb) => {
  process.nextTick(() => {
    cb(null, {
      id: user.id,
      name: user.name,
      email: user.email,
      weekly_target: user.weekly_target,
    });
  });
});

passport.deserializeUser((user: Express.User, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
}); 

// Handle oauth redirects for each strategy
mountRedirects(auth, passport);

auth.get('/currentuser', (req, res) => {
  if (!req.user) return res.status(404).json('no user');
  return res.status(200).json(req.user);
});

auth.get('/currentuser/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.status(200).json("logged out");
    });
  });
});


export default auth;