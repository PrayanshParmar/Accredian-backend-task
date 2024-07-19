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
exports.referSchema = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email is required"),
    password: zod_1.z
        .string()
        .min(4, "Mininum 4 character's is required")
        .max(30, "Password can be upto 30 character's"),
});
const registrationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email is required"),
    password: zod_1.z
        .string()
        .min(4, "Mininum 4 character's is required")
        .max(30, "Password can be upto 30 character's"),
});
exports.referSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    email: zod_1.z.string().email("Email is required"),
    programs: zod_1.z.string(),
});
const validateRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    try {
        let result;
        if (req.path === "/api/auth/register") {
            result = registrationSchema.parse(userInput);
        }
        else if (req.path === "/api/auth/login") {
            result = loginSchema.parse(userInput);
        }
        else if (req.path === "/api/refer/refer-user")
            req.user = result;
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const validationIssues = error.errors.map((issue) => {
                return {
                    error: issue.message,
                };
            });
            res.status(400).json({ error: validationIssues });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.default = validateRequest;
