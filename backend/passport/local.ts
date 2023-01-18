import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from "../db";
import { User } from "../types/user";

interface DB_Credential {
  hash: string,
  user_id: string,
  username: string,
}

export default (passport: PassportStatic) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      db.query(
        'select * from local_credentials where username = $1', 
        [username], 
        (err, res) => {
          if (err) return done(err);
          if (!res.rowCount) return done(null, false);
          const comp = res.rows[0] as DB_Credential;

          bcrypt.compare(password, comp.hash)
            .then(matches => {
              if (!matches) return done(null, false);
              
              db.query(
                'select * from users where id = $1',
                [comp.user_id],
                (err, res) => {
                  if (err) return done(null, false);

                  const user = res.rows[0] as User;
                  return done(null, user);
                }
              )
            })
      })
    }
  ))
}