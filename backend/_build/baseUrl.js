"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.getEnv = void 0;
const getEnv = (production, development) => {
    if (process.env.NODE_ENV === 'production') {
        return typeof production === 'function'
            ? production()
            : production;
    }
    else {
        return typeof development === 'function'
            ? development()
            : development;
    }
};
exports.getEnv = getEnv;
exports.baseUrl = (0, exports.getEnv)('https://amped.herokuapp.com/api', 'http://192.168.2.27:8000/api');
