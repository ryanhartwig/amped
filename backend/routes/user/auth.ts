import db from "../../db";

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook'
import express from 'express';
import { randomUUID } from "crypto";

const auth = express.Router();

 

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, {
      id: user.id,
      name: user.name,
      email: user.email,
      weekly_target: user.weekly_target,
    })
  })
});

passport.deserializeUser((user: Express.User, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  })
})

auth.get('/login/federated/facebook', passport.authenticate('facebook', { scope: ['user_friends'] }));
auth.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successReturnToOrRedirect: 'http://localhost:3000/login',
  failureRedirect: 'http://localhost:3000/login',
}));

auth.get('/currentuser', (req, res) => {
  if (!req.user) return res.status(404).json('no user');
  return res.status(200).json(req.user);
})

auth.get('/api/currentuser/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.status(200).json("logged out");
    })
  });
})

export default auth;