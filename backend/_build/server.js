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
const passport_1 = __importDefault(require("passport"));
const facebook_1 = __importDefault(require("./passport/facebook"));
const google_1 = __importDefault(require("./passport/google"));
const twitter_1 = __importDefault(require("./passport/twitter"));
const local_1 = __importDefault(require("./passport/local"));
const memorystore_1 = __importDefault(require("memorystore"));
const MemoryStore = (0, memorystore_1.default)(express_session_1.default);
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:3000',
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: 'sample secret',
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
}));
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Mount strategies to passport
(0, local_1.default)(passport_1.default);
(0, facebook_1.default)(passport_1.default);
(0, google_1.default)(passport_1.default);
(0, twitter_1.default)(passport_1.default);
// Mounts routes defined in ./routes/index.ts to app
(0, routes_1.default)(app);
app.get('/api/test', (_, res, next) => {
    res.status(200).send('Received request and updates');
    next();
});
app.listen(port, () => {
    console.log('⚡️', `Server is running at http://localhost:${port}`);
});
