"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const validate_request_1 = __importDefault(require("../middleware/validate-request"));
const authenticate_1 = require("../middleware/authenticate");
exports.default = (router) => {
    router.post("/api/auth/register", validate_request_1.default, authentication_1.register);
    router.post("/api/auth/login", validate_request_1.default, authentication_1.login);
    router.post("/api/auth/logout", authentication_1.logout);
    router.get("/api/auth/verify-token", authenticate_1.isAuthenticated, authentication_1.verify);
};
