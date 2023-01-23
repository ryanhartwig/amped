"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const passport_facebook_1 = require("passport-facebook");
const db_1 = __importDefault(require("../db"));
exports.default = (passport) => {
    passport.use(new passport_facebook_1.Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/api/oauth2/redirect/facebook',
    }, (_accessToken, _refreshToken, profile, cb) => {
        db_1.default.query('select * from federated_credentials where provider = $1 and subject = $2', ['https://www.facebook.com', profile.id], (err, res) => {
            if (err)
                return cb(err);
            const userId = (0, crypto_1.randomUUID)();
            // New user
            if (!res.rowCount) {
                db_1.default.query(`insert into users values (
              $1, $2, $3, $4
            )`, [userId, profile.displayName, '', 0], (err) => {
                    if (err)
                        return cb(err);
                    const fcId = (0, crypto_1.randomUUID)();
                    db_1.default.query(`insert into federated_credentials values (
                  $1, $2, $3, $4
                )`, [fcId, userId, 'https://www.facebook.com', profile.id], (err) => {
                        if (err)
                            return cb(err);
                        const user = {
                            id: userId,
                            name: profile.displayName,
                            email: '',
                            weekly_target: 0,
                        };
                        return cb(null, user);
                    });
                });
            }
            // User exists
            else {
                db_1.default.query('select * from users where id = $1', [res.rows[0].user_id], (err, res) => {
                    if (err)
                        return cb(err);
                    if (!res.rowCount)
                        return cb(null, false);
                    return cb(null, res.rows[0]);
                });
            }
        });
    }));
};
