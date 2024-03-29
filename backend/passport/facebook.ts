import { randomUUID } from "crypto";
import { PassportStatic } from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import db from "../db";

export default (passport: PassportStatic) => {
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
              return cb(null, res.rows[0]);
            }
          );
        }
      }
    )
  }));
}
