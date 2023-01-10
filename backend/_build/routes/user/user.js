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
const db_1 = __importDefault(require("../../db"));
const goals_1 = __importDefault(require("./goals"));
const user = (0, express_promise_router_1.default)();
user.use('/goals', goals_1.default);
user.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, weekly_target } = req.body;
    const params = [id, name, email, weekly_target];
    if (params.some(p => p === undefined))
        return res.status(400).send('Missing parameters in request body');
    const response = yield db_1.default.query('insert into users values ($1, $2, $3, $4) returning *', params);
    if (response.rows)
        return res.status(201).send(response.rows);
    else
        return res.status(500).json(response);
}));
user.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield db_1.default.query('select * from users where id = $1', [id]);
    if (!response.rowCount)
        return res.status(404).send('No user found');
    else
        return res.json(response.rows);
}));
user.put('/:param_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { param_id } = req.params;
    const patch = req.body;
    const existing = yield db_1.default.query('select * from users where id = $1', [param_id]);
    if (!existing.rowCount)
        return res.status(404).send('A user with the provided id was not found.');
    const { id, name, email, weekly_target } = Object.assign(Object.assign({}, existing.rows[0]), patch);
    const response = yield db_1.default.query(`
    update users set 
      name = $2,
      email = $3,
      weekly_target = $4
    where id = $1
    returning *
  `, [id, name, email, weekly_target]);
    return res.status(200).send(response.rows);
}));
exports.default = user;
