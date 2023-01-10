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
const exercise = (0, express_promise_router_1.default)();
/* Get all exercise data for a performed routine */
exercise.get('/:performed_routine_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { performed_routine_id } = req.params;
    if (!performed_routine_id)
        return res.status(400).send('No performed exercise id provided');
    const response = yield db_1.default.query('select * from performed_exercise where performed_routine_id = $1', [performed_routine_id]);
    if (!response.rowCount)
        return res.status(404).send('No exercise data for provided routine id');
    res.status(200).json(response.rows);
}));
/* Add exercise data */
exercise.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, exercise_id, performed_routine_id, exercise_position, exercise_name, duration } = req.body;
    const params = [id, exercise_id, performed_routine_id, exercise_position, exercise_name, duration];
    if (params.some(v => v === undefined))
        return res.status(400).send('Missing properties in JSON object');
    const response = yield db_1.default.query(`
    insert into performed_exercise values (
      $1, $2, $3, $4, $5, $6
    ) returning *
  `, params);
    if (!response.rowCount)
        return res.status(500).send('Could not create exercise data');
    res.status(201).send(response.rows[0]);
}));
/* Edit existing exercise data */
exercise.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patch = req.body;
    const select = yield db_1.default.query('select * from performed_exercise where id = $1', [id]);
    const existing = select.rows[0];
    if (!existing)
        return res.status(404).send('Could not find exercise data with given id');
    const { exercise_id, performed_routine_id, exercise_position, exercise_name, duration } = Object.assign(Object.assign({}, existing), patch);
    const params = [exercise_id, performed_routine_id, exercise_position, exercise_name, duration];
    const response = yield db_1.default.query(`
    update performed_exercise set 
      exercise_id = $2,
      performed_routine_id = $3,
      exercise_position = $4,
      exercise_name = $5,
      duration = $6
    where id = $1
    returning *
  `, [id, ...params]);
    if (!response.rowCount)
        return res.status(500).send('Could not update exercise data');
    res.status(200).json(response.rows[0]);
}));
/* Delete existing data */
exercise.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('No id provided');
    const response = yield db_1.default.query('delete from performed_exercise where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).send('No exercise data with provided id exists');
    return res.status(200).send(`Successfully deleted exercise data with id: '${response.rows[0].id}'`);
}));
exports.default = exercise;
