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
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email(),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(4, { message: "Password must contain at least 4 characters" }),
});
const registrationSchema = loginSchema.extend({
    username: zod_1.z
        .string({
        required_error: "Username is required",
    })
        .min(3, { message: "username must contain at least 3 characters" })
        .max(20, { message: "username must not exceed 20 characters" })
        .refine((value) => {
        // Check for alphanumeric characters, @, +, and -
        const validRegex = /^[a-zA-Z0-9@+\-]+$/;
        return validRegex.test(value);
    }, {
        message: "Username must only contain alphanumeric characters, @, +, and -",
    }),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(4, { message: "Password must contain at least 4 characters" })
        .refine((value) => {
        const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/@]/;
        const numberRegex = /\d/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        return (symbolRegex.test(value) &&
            numberRegex.test(value) &&
            uppercaseRegex.test(value) &&
            lowercaseRegex.test(value));
    }, {
        message: "Password must contain symbols, numbers, uppercase, and lowercase characters",
    }),
});
const validateRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    try {
        let result;
        if (req.path === "/api/v1/register") {
            result = registrationSchema.parse(userInput);
        }
        else {
            result = loginSchema.parse(userInput);
        }
        req.user = result;
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const validationIssues = error.errors.map((issue) => {
                return {
                    validation: issue.path[0],
                    message: issue.message,
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
