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
const goals_1 = __importDefault(require("./user/goals"));
const scheduled_1 = __importDefault(require("./user/scheduled"));
const user_1 = __importDefault(require("./user/user"));
exports.default = (app) => {
    app.use('/api/user', user_1.default);
    app.use('/api/user/goals', goals_1.default);
    app.use('/api/user/scheduled', scheduled_1.default);
    app.use('/api/routines', routines_1.default);
    app.use('/api/exercises', exercises_1.default);
    app.use('/api/routine_exercise', routine_exercise_1.default);
    app.use('/api/data/routine', routine_1.default);
    app.use('/api/data/exercise', exercise_1.default);
    app.use('/api/data/set', set_1.default);
};
