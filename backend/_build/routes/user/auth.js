"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const authenticateStrategies_1 = require("../../passport/authenticateStrategies");
const auth = express_1.default.Router();
passport_1.default.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, {
            id: user.id,
            name: user.name,
            email: user.email,
            weekly_target: user.weekly_target,
        });
    });
});
passport_1.default.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});
// Handle authentication for each strategy & redirect
(0, authenticateStrategies_1.authenticateStrategies)(auth, passport_1.default);
auth.get('/currentuser', (req, res) => {
    if (!req.user)
        return res.status(404).json('no user');
    return res.status(200).json(req.user);
});
auth.get('/currentuser/logout', (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        req.session.destroy((err) => {
            if (err)
                return next(err);
            res.clearCookie('connect.sid');
            return res.status(200).json("logged out");
        });
    });
});
exports.default = auth;
