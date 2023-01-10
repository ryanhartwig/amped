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
const routine = (0, express_promise_router_1.default)();
/* Get all data for user */
routine.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!user_id)
        return res.status(400).send('No performed routine id provided');
    const response = yield db_1.default.query('select * from performed_routine where user_id = $1', [user_id]);
    if (!response.rowCount)
        return res.status(404).send('No routine data for provided user id');
    res.status(200).json(response.rows);
}));
/* Add routine data */
routine.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, routine_id, duration, start_date, notes, energy } = req.body;
    const params = [id, user_id, routine_id, duration, start_date, notes, energy];
    if (params.some(v => v === undefined))
        return res.status(400).send('Missing properties in JSON object');
    const response = yield db_1.default.query(`
    insert into performed_routine values (
      $1, $2, $3, $4, $5, $6, $7
    ) returning *
  `, params);
    if (!response.rowCount)
        return res.status(500).send('Could not create routine data');
    res.status(201).send(response.rows[0]);
}));
/* Edit existing routine data */
routine.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patch = req.body;
    const select = yield db_1.default.query('select * from performed_routine where id = $1', [id]);
    const existing = select.rows[0];
    if (!existing)
        return res.status(404).send('Could not find routine data with given id');
    const { user_id, routine_id, duration, start_date, notes, energy } = Object.assign(Object.assign({}, existing), patch);
    const params = [user_id, routine_id, duration, start_date, notes, energy];
    const response = yield db_1.default.query(`
    update performed_routine set 
      user_id = $2,
      routine_id = $3,
      duration = $4,
      start_date = $5,
      notes = $6,
      energy = $7
    where id = $1
    returning *
  `, [id, ...params]);
    if (!response.rowCount)
        return res.status(500).send('Could not update routine data');
    res.status(200).json(response.rows[0]);
}));
/* Delete existing data */
routine.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('No id provided');
    const response = yield db_1.default.query('delete from performed_routine where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).send('No routine data with provided id exists');
    return res.status(200).send(`Successfully deleted routine data with id: '${response.rows[0].id}'`);
}));
exports.default = routine;
