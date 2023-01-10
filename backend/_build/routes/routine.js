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
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const db_1 = __importDefault(require("../db"));
const routines = (0, express_promise_router_1.default)();
routines.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    if (!user_id)
        return res.status(400).send('No user id provided');
    const response = yield db_1.default.query('select * from routine where user_id = $1', [user_id]);
    res.status(200).json(response.rows);
}));
routines.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes } = req.body;
    const required = [id, user_id, name, est_duration, intensity, type, favourited];
    const opt = [tags, notes, prev_notes].map(v => v === undefined ? null : v);
    if (required.some(v => v === undefined))
        return res.status(400).send('Missing properties in JSON object.');
    const response = yield db_1.default.query(`
    insert into routine values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    ) returning *
  `, [...required, ...opt]);
    if (!response.rowCount)
        return res.status(500).send('Could not create routine');
    res.status(201).send(response.rows[0]);
}));
exports.default = routines;
