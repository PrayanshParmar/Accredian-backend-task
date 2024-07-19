"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const refer_1 = require("../controllers/refer");
const authenticate_1 = require("../middleware/authenticate");
const validate_request_1 = __importDefault(require("../middleware/validate-request"));
exports.default = (router) => {
    router.post("/api/refer/refer-friend", authenticate_1.isAuthenticated, validate_request_1.default, refer_1.ReferFriend);
};
