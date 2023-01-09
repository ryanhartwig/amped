"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const uuid_1 = require("uuid");
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const test = (0, express_promise_router_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use('/test', test);
app.get('/', (_, res) => {
    res.send('<h1>Express += sd typescript server</h1>');
});
test.get('/ct', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.pool.query(`insert into users values ($1, 'ryan', 'ryan', 3) returning *`, [(0, uuid_1.v4)()]);
    res.send(response);
}));
app.listen(port, () => {
    console.log('⚡️', `Server is running at http://localhost:${port}`);
});
