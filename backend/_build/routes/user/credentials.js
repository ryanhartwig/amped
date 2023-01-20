"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
const credentials = (0, express_promise_router_1.default)();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ADDR,
        pass: process.env.MAIL_PASS,
    },
});
credentials.get('/exists/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username } = req.params;
    const response = yield db_1.default.query('select * from local_credentials where username = $1', [username]);
    return res.status(200).json(((_a = response.rows[0]) === null || _a === void 0 ? void 0 : _a.username) || null);
}));
credentials.get('/email/exists/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { email } = req.params;
    const response = yield db_1.default.query('select * from users where email = $1', [email]);
    return res.status(200).json(((_b = response.rows[0]) === null || _b === void 0 ? void 0 : _b.email) || null);
}));
// For password resets, this route handles the email entry portion, creates a reset_id & reset_deadline, and sends a reset email
credentials.get('/verify/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const response = yield db_1.default.query('select * from users where email = $1', [email]);
    if (!response.rowCount)
        return res.status(404).send();
    const user_id = response.rows[0].id;
    const reset_id = (0, uuid_1.v4)();
    const expiryDelta = 1000 * 60 * 60 * 6; // 6 hours
    const expiryDate = new Date().getTime() + expiryDelta;
    const idResponse = yield db_1.default.query(`update local_credentials
    set 
      reset_id = $1,
      reset_deadline = $2
    where user_id = $3
    returning *`, [reset_id, expiryDate, user_id]);
    if (!idResponse.rowCount)
        return res.status(500).send();
    transporter.sendMail({
        from: 'reset.amped@gmail.com',
        to: email,
        subject: 'AMPED | Password Reset Link',
        html: `<p>Follow the link below to reset your password.</p><br><br><a href="http://localhost:3000/login/reset/${reset_id}">http://localhost:3000/login/reset/${reset_id}</a><br><p>If you did not request a password reset, please disregard this email.</p>`,
    }, (err, info) => {
        if (err) {
            console.log(err);
            console.log(info);
            return res.status(500).json(err);
        }
        else
            return res.status(204).send();
    });
}));
// For password resets, this route verifies the equality & deadline of the link that the user clicks on to reset password
credentials.get('/reset/:reset_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reset_id } = req.params;
    const response = yield db_1.default.query('select * from local_credentials where reset_id = $1', [reset_id]);
    if (!response.rowCount)
        return res.status(404).send('Not found');
    const { reset_deadline, reset_id: received_id } = response.rows[0];
    if (reset_id !== received_id || reset_deadline < Date.now())
        return res.status(401).send('Invalid or expired');
    return res.status(200).json(response.rows[0].user_id);
}));
// For password resets, this route updates the user's password
credentials.put('/password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, password } = req.body; // send reset id to verify link still exists
    const hash = yield bcrypt.hash(password, 12);
    const response = yield db_1.default.query(`
    update local_credentials
    set hash = $1, 
    reset_id = null,
    reset_deadline = null
    where user_id = $2
    returning *`, [hash, user_id]);
    if (!response.rowCount)
        return res.status(500).send();
    return res.status(204).send();
}));
credentials.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, user_id, username } = req.body;
    const hash = yield bcrypt.hash(password, 12);
    const response = yield db_1.default.query(`
    insert into local_credentials values (
      $1, $2, $3
    ) returning user_id`, [hash, user_id, username]);
    if (!response.rowCount)
        return res.status(500).json('Could not create credentials');
    return res.status(200).json(response.rows[0]);
}));
exports.default = credentials;
