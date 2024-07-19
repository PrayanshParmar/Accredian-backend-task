"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 8080;
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
exports.app.use("/", (0, routes_1.default)());
exports.app.get("/health", (req, res) => {
    res.status(200).json({ message: "success" });
});
exports.app.listen(port, () => {
    console.log(`[server]: server is listening at http://localhost:${port}/`);
    // swaggerDocs(app, port as number);
});
