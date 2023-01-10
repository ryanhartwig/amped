"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exercises_1 = __importDefault(require("./exercises"));
const routines_1 = __importDefault(require("./routines"));
const users_1 = __importDefault(require("./users"));
exports.default = (app) => {
    app.use('/users', users_1.default);
    app.use('/routines', routines_1.default);
    app.use('/exercises', exercises_1.default);
};
