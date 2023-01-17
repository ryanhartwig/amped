"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateStrategies = void 0;
const authenticateStrategies = (auth, passport) => {
    // Facebook
    auth.get('/login/federated/facebook', passport.authenticate('facebook', { scope: ['user_friends'] }));
    auth.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
        successReturnToOrRedirect: 'http://localhost:3000/login',
        failureRedirect: 'http://localhost:3000/login',
    }));
    // Google
    auth.get('/login/federated/google', passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));
    auth.get('/oauth2/redirect/google', passport.authenticate('google', {
        successReturnToOrRedirect: 'http://localhost:3000/login',
        failureRedirect: 'http://localhost:3000/login',
    }));
    // Twitter
    auth.get('/login/federated/twitter', passport.authenticate('twitter'));
    auth.get('/oauth2/redirect/twitter', passport.authenticate('twitter', {
        successReturnToOrRedirect: 'http://localhost:3000/login',
        failureRedirect: 'http://localhost:3000/login',
    }));
};
exports.authenticateStrategies = authenticateStrategies;
