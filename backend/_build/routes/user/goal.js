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
const goal = (0, express_promise_router_1.default)();
/* Get all goals for provided user_id */
goal.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!user_id)
        return res.status(400).send('Missing user_id url parameter');
    const response = yield db_1.default.query('select * from goals where user_id = $1', [user_id]);
    if (!response.rowCount)
        return res.status(404).send('No goals found for provided user id');
    res.status(200).json(response.rows);
}));
goal.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, deadline, completed, goal } = req.body;
    const params = [id, user_id, deadline, completed, goal];
    if (params.some(p => p === undefined))
        return res.status(400).send("Missing parameter(s) in JSON object");
    const response = yield db_1.default.query(`
    insert into goal
    values (
      $1, $2, $3, $4, $5
    ) returning *
  `, params);
}));
goal.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('Missing id url parameter');
    const existing = yield db_1.default.query('select * from goal where id = $1', [id]);
    const patch = req.body;
    const { user_id, deadline, completed, goal } = Object.assign(Object.assign({}, existing.rows[0]), patch);
    const response = yield db_1.default.query(`
    update goal set
      user_id = $2,
      deadline = $3,
      completed = $4,
      goal = $5
    where id = $1
    returning *
  `, [id, user_id, deadline, completed, goal]);
    if (!response.rowCount)
        return res.status(500).send('Could not update goal');
    res.status(200).json(response.rows[0]);
}));
goal.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('Missing id url parameter');
    const response = yield db_1.default.query('delete from goal where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).send('A goal with the provided id does not exist');
    res.status(200).send(`Successfully deleted goal with id: ${response.rows[0].id}`);
}));
exports.default = goal;
