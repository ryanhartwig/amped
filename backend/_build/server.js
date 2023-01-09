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
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
// Mounts routes defined in ./routes/index.ts
(0, routes_1.default)(app);
app.listen(port, () => {
    console.log('⚡️', `Server is running at http://localhost:${port}`);
});
