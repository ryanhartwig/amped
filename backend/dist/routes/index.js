"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importDefault(require("./test"));
exports.default = (app) => {
    app.use('/test', test_1.default);
    // additional routes here
};
