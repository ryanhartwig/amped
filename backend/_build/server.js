"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const facebook_1 = __importDefault(require("./passport/facebook"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'sample secret',
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
}));
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Mount strategies
(0, facebook_1.default)(passport_1.default);
// Mounts routes defined in ./routes/index.ts
(0, routes_1.default)(app);
app.listen(port, () => {
    console.log('⚡️', `Server is running at http://localhost:${port}`);
});
