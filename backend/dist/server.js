"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use('/', (0, morgan_1.default)('dev'));
app.get('/', (_, res) => {
    res.send('<h1>Express += sd typescript server</h1>');
});
app.listen(port, () => {
    console.log('⚡️', `Server is running at http://localhost:${port}`);
});
