import db from "../../db";

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook'
import express from 'express';
import { randomUUID } from "crypto";

const auth = express.Router();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  callbackURL: '/api/oauth2/redirect/facebook',
}, (_accessToken, _refreshToken, profile, cb) => {
  db.query(
    'select * from federated_credentials where provider = $1 and subject = $2', 
    ['https://www.facebook.com', profile.id], 
    (err, res) => {
      if (err) return cb(err);
      const userId = randomUUID();

      // New user
      if (!res.rowCount) {
        db.query(
          `insert into users values (
            $1, $2, $3, $4
          )`, 
          [userId, profile.displayName, '', 0],
          (err) => {
            if (err) return cb(err);
            const fcId = randomUUID();
            
            db.query(
              `insert into federated_credentials values (
                $1, $2, $3, $4
              )`,
              [fcId, userId, 'https://www.facebook.com', profile.id],
              (err) => {
                if (err) return cb(err);
                const user = {
                  id: userId,
                  name: profile.displayName,
                  email: '',
                  weekly_target: 0,
                }

                return cb(null, user);
              }
            )
          }
        )
      } 

      // User exists
      else {
        db.query(
          'select * from users where id = $1',
          [res.rows[0].user_id],
          (err, res) => {
            if (err) return cb(err);
            if (!res.rowCount) return cb(null, false);
            console.log(res.rows[0])
            return cb(null, res.rows[0]);
          }
        );
      }
    }
  )
}));

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
  const user = req.user;

  console.log(req.isAuthenticated());

  if (!user) return res.status(404).json('no user');
  
  return res.status(200).json(user);
})

auth.post('/currentuser/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.status(200).json("logged out");
  });
})

// auth.post('/logout', (req, res, next) => {
//   req.logout(err => { 
//     if (err) return next(err);
//     res.redirect('/');
//   });
// });

export default auth;