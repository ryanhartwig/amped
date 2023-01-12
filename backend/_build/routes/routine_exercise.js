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
const routine_exercise = (0, express_promise_router_1.default)();
/* Get all exercises belonging provided routine_id */
routine_exercise.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!user_id)
        return res.status(400).json('Missing user_id url parameter');
    const response = yield db_1.default.query('select * from routines_exercises where user_id = $1', [user_id]);
    // if (!response.rowCount) return res.status(404).json('No exercises found for specified user id');
    res.status(200).json(response.rows);
}));
routine_exercise.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, routine_id, exercise_id, position, user_id } = req.body;
    const params = [id, routine_id, exercise_id, position, user_id];
    if (params.some(p => p === undefined))
        return res.status(400).json('Missing parameters in JSON object');
    const response = yield db_1.default.query(`
    insert into routines_exercises
    values (
      $1, $2, $3, $4, $5
    ) returning *
  `, params);
    if (!response.rowCount)
        return res.status(500).json('Could not add routine_exercise data');
    res.status(201).json(response.rows[0]);
}));
routine_exercise.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json('Missing id url parameter');
    const response = yield db_1.default.query('delete from routines_exercises where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).json('A routine_exercise relationship does not exist with provided id');
    res.status(200).json(`Successfully deleted routine_exercise with id: ${response.rows[0].id}`);
}));
exports.default = routine_exercise;
