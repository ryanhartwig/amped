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
const user = (0, express_promise_router_1.default)();
user.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, weekly_target } = req.body;
    const params = [id, name, email, weekly_target];
    if (params.some(p => p === undefined))
        return res.status(400).json('Missing parameters in request body');
    const response = yield db_1.default.query('insert into users values ($1, $2, $3, $4) returning *', params);
    if (!response.rowCount)
        return res.status(500).json('Could not create user');
    res.status(201).json(response.rows[0]);
}));
user.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield db_1.default.query('select * from users where id = $1', [id]);
    if (!response.rowCount)
        return res.status(404).json('No user found');
    else
        return res.json(response.rows[0]);
}));
user.put('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const patch = req.body;
    const existing = yield db_1.default.query('select * from users where id = $1', [user_id]);
    if (!existing.rowCount)
        return res.status(404).json('A user with the provided id was not found.');
    const { id, name, email, weekly_target } = Object.assign(Object.assign({}, existing.rows[0]), patch);
    const response = yield db_1.default.query(`
    update users set 
      name = $2,
      email = $3,
      weekly_target = $4
    where id = $1
    returning *
  `, [id, name, email, weekly_target]);
    return res.status(200).json(response.rows[0]);
}));
user.delete('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const response = yield db_1.default.query('delete from users where id = $1 returning *', [user_id]);
    if (!response.rowCount)
        return res.status(500).json('Could not delete user or does not exist');
    return res.status(200).json('Successfully deleted user with id: ' + user_id);
}));
exports.default = user;
