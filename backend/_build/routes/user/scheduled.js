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
const scheduled = (0, express_promise_router_1.default)();
/* Get all goals for provided user_id */
scheduled.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!user_id)
        return res.status(400).json('Missing user_id url parameter');
    const response = yield db_1.default.query('select * from scheduled where user_id = $1', [user_id]);
    if (!response.rowCount)
        return res.status(404).json('No scheduled routine data found for provided user id');
    res.status(200).json(response.rows);
}));
scheduled.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, routine_id, day } = req.body;
    const params = [id, user_id, routine_id, day];
    if (params.some(p => p === undefined))
        return res.status(400).json("Missing parameter(s) in JSON object");
    const response = yield db_1.default.query(`
    insert into scheduled
    values (
      $1, $2, $3, $4
    ) returning *
  `, params);
    if (!response.rowCount)
        return res.status(500).json('Could not create scheduled routine');
    res.status(201).json(response.rows[0]);
}));
scheduled.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json('Missing id url parameter');
    const response = yield db_1.default.query('delete from scheduled where id = $1 returning *', [id]);
    if (!response.rowCount)
        return res.status(404).json('A schedule with the provided id does not exist');
    res.status(200).json(`Successfully deleted schedule with id: ${response.rows[0].id}`);
}));
exports.default = scheduled;
