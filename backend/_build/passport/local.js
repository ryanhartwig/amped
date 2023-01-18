"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
exports.default = (passport) => {
    passport.use(new passport_local_1.Strategy((username, password, done) => {
        db_1.default.query('select * from local_credentials where username = $1', [username], (err, res) => {
            if (err)
                return done(err);
            if (!res.rowCount)
                return done(null, false);
            const comp = res.rows[0];
            bcrypt_1.default.compare(password, comp.hash)
                .then(matches => {
                if (!matches)
                    return done(null, false);
                db_1.default.query('select * from users where id = $1', [comp.user_id], (err, res) => {
                    if (err)
                        return done(null, false);
                    const user = res.rows[0];
                    return done(null, user);
                });
            });
        });
    }));
};
