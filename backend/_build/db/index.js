"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    ssl: {
        rejectUnauthorized: false,
    },
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS || '',
    port: Number(process.env.PG_PORT),
});
