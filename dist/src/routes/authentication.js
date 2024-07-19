"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const validate_request_1 = __importDefault(require("../middleware/validate-request"));
exports.default = (router) => {
    router.post('/api/v1/register', validate_request_1.default, authentication_1.register);
    router.post('/api/v1/login', validate_request_1.default, authentication_1.login);
    router.get('/api/v1/logout', authentication_1.logout);
};
