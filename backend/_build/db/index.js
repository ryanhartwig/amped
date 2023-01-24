"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const baseUrl_1 = require("../baseUrl");
exports.default = new pg_1.Pool({
    ssl: (0, baseUrl_1.getEnv)({ rejectUnauthorized: false }, false),
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS || '',
    port: Number(process.env.PG_PORT),
});
