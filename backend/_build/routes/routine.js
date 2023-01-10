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
/* Get all routines for user */
routines.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!user_id)
        return res.status(400).send('No user id provided');
    const response = yield db_1.default.query('select * from routine where user_id = $1', [user_id]);
    res.status(200).json(response.rows);
}));
/* Create a new routine */
routines.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes } = req.body;
    const params = [id, user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes];
    if (params.some(v => v === undefined))
        return res.status(400).send('Missing properties in JSON object');
    const response = yield db_1.default.query(`
    insert into routine values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    ) returning *
  `, params);
    if (!response.rowCount)
        return res.status(500).send('Could not create routine');
    res.status(201).send(response.rows[0]);
}));
/* Edit an existing routine */
routines.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patch = req.body;
    const select = yield db_1.default.query('select * from routine where id = $1', [id]);
    const existing = select.rows[0];
    if (!existing)
        return res.status(404).send('Could not find routine with given id');
    const { user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes } = Object.assign(Object.assign({}, existing), patch);
    const params = [user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes];
    const response = yield db_1.default.query(`
    update routine set 
      user_id = $2,
      name = $3,
      est_duration = $4,
      intensity = $5,
      type = $6,
      favourited = $7,
      tags = $8,
      notes = $9,
      prev_notes = $10
    where id = $1
    returning *
  `, [id, ...params]);
    if (!response.rowCount)
        return res.status(500).send('Could not update routine');
    res.status(200).json(response.rows[0]);
}));
/* Delete an existing routine */
routines.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('No id provided');
    const response = yield db_1.default.query('delete from routine where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).send('No routine with provided id exists');
    return res.status(200).send(`Successfully deleted routine: '${response.rows[0].name}'`);
}));
exports.default = routines;
