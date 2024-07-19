"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.logout = exports.register = exports.login = void 0;
const prisma_1 = require("../db/prisma");
const jwt_1 = require("../lib/jwt");
const salt_1 = require("../lib/salt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.db.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials!" });
        }
        else {
            const salt = process.env.SALT_SECRET || "SALT_SECRET";
            const expectedHash = (0, salt_1.authentication)(salt, password);
            if ((user === null || user === void 0 ? void 0 : user.password) != expectedHash) {
                return res.status(401).json({ error: "Invalid Credentials!" });
            }
            const token = (0, jwt_1.createJwtToken)(user);
            res.cookie("jwt-token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({ message: "Logged in succesfully!" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield prisma_1.db.user.findFirst({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already existed!" });
        }
        const salt = process.env.SALT_SECRET || "SALT_SECRET";
        yield prisma_1.db.user.create({
            data: {
                email,
                password: (0, salt_1.authentication)(salt, password),
            },
        });
        return res.status(200).json({ message: "User created succesfully!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.register = register;
const logout = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("jwt-token", {
            httpOnly: true,
        });
        return res.status(200).json({ message: "Logged out successfully!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.logout = logout;
const verify = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExpired = false;
        return res
            .status(200)
            .json({ message: "Token is verified", isExpired: isExpired });
    }
    catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.verify = verify;
