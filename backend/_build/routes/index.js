"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routine_1 = __importDefault(require("./routine"));
const user_1 = __importDefault(require("./user"));
exports.default = (app) => {
    app.use('/users', user_1.default);
    app.use('/routines', routine_1.default);
};
