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
const exercises = (0, express_promise_router_1.default)();
/* Get all exercises for user */
exercises.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!user_id)
        return res.status(400).send('Missing "user_id" url parameter');
    const response = yield db_1.default.query('select * from exercise where user_id = $1', [user_id]);
    return res.status(200).json(response.rows);
}));
/* Create a new exercise */
exercises.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes } = req.body;
    const params = [id, user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes];
    if (params.some(p => p === undefined))
        return res.status(400).send('Missing parameter(s) in JSON object');
    const response = yield db_1.default.query(`
    insert into exercise
    values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    ) returning *
  `, params);
    if (!response.rowCount)
        return res.status(500).send('Could not add exercise');
    res.status(201).json(response.rows);
}));
/* Edit an existing exercise */
exercises.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('Missing "id" url parameter');
    const patch = req.body;
    const existing = yield db_1.default.query('select * from exercise where id = $1', [id]);
    if (!existing.rowCount)
        return res.status(404).send('Could not find exercise with given id');
    const { user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes } = Object.assign(Object.assign({}, existing.rows[0]), patch);
    const params = [user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes];
    const response = yield db_1.default.query(`
    update exercise set
      user_id = $2,
      name = $3,
      exercise_goal = $4,
      muscle_targets = $5,
      type = $6,
      favourited = $7,
      intensity = $8,
      notes = $9
    where id = $1
    returning *
  `, [id, ...params]);
    if (!response.rowCount)
        return res.status(500).send('Could not update exercise');
    res.status(200).json(response.rows[0]);
}));
exercises.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('Missing "id" url parameter');
    const response = yield db_1.default.query('delete from exercise where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).send('Could not find exercise with given id');
    res.status(200).send(`Successfully deleted exercise: "${response.rows[0].name}"`);
}));
exports.default = exercises;
