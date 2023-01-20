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
const set = (0, express_promise_router_1.default)();
/* Get all exercise data for a performed routine */
set.get('/:performed_exercise_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { performed_exercise_id } = req.params;
    if (!performed_exercise_id)
        return res.status(400).json('No performed exercise id provided');
    const response = yield db_1.default.query('select * from performed_set where performed_exercise_id = $1 order by position', [performed_exercise_id]);
    res.status(200).json(response.rows);
}));
/* Add exercise data */
set.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, performed_exercise_id, duration, modifiers, position, weight, count } = req.body;
    const params = [id, performed_exercise_id, duration, modifiers, position, weight, count];
    if (params.some(p => p === undefined))
        return res.status(400).json('Missing properties in json object');
    const response = yield db_1.default.query(`
    insert into performed_set values (
      $1, $2, $3, $4, $5, $6, $7
    ) returning *
  `, params);
    if (!response.rowCount) {
        return res.status(500).json('Could not create set data');
    }
    res.status(201).json(response.rows[0]);
}));
/* Edit existing exercise data */
set.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patch = req.body;
    const select = yield db_1.default.query('select * from performed_set where id = $1', [id]);
    const existing = select.rows[0];
    if (!existing)
        return res.status(404).json('Could not find exercise data with given id');
    const { performed_exercise_id, duration, modifiers, position, weight, count } = Object.assign(Object.assign({}, existing), patch);
    const params = [performed_exercise_id, duration, modifiers, position, weight, count];
    const response = yield db_1.default.query(`
    update performed_set set 
      performed_exercise_id = $2,
      duration = $3,
      modifiers = $4,
      position = $5,
      weight = $6,
      count = $7
    where id = $1
    returning *
  `, [id, ...params]);
    if (!response.rowCount)
        return res.status(500).json('Could not update set data');
    res.status(200).json(response.rows[0]);
}));
/* Delete existing data */
set.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json('No id provided');
    const response = yield db_1.default.query('delete from performed_set where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).json('No set data with provided id exists');
    return res.status(200).json(`Successfully deleted set data with id: '${response.rows[0].id}'`);
}));
exports.default = set;
