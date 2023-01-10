"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exercises_1 = __importDefault(require("./exercises"));
const exercise_1 = __importDefault(require("./performance_data/exercise"));
const routine_1 = __importDefault(require("./performance_data/routine"));
const set_1 = __importDefault(require("./performance_data/set"));
const routines_1 = __importDefault(require("./routines"));
const routine_exercise_1 = __importDefault(require("./routine_exercise"));
const user_1 = __importDefault(require("./user/user"));
exports.default = (app) => {
    app.use('/user', user_1.default);
    // ( mounted in user.ts )
    // user/goals -> user/goals.ts
    // user/scheduled -> user/scheduled.ts
    app.use('/routines', routines_1.default);
    app.use('/exercises', exercises_1.default);
    app.use('/routine_exercise', routine_exercise_1.default);
    app.use('/data/routine', routine_1.default);
    app.use('/data/exercise', exercise_1.default);
    app.use('/data/set', set_1.default);
};