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
exports.logout = exports.register = exports.login = void 0;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   try {
    //     const { email, password } = req.body;
    //     if (!email || !password) {
    //       return res.sendStatus(400);
    //     }
    //     // const user = await getUserByEmail(email).select(
    //     //   "+authentication.salt +authentication.password"
    //     // );
    //     if (!user) {
    //       return res.sendStatus(401);
    //     } else {
    //       const expectedHash = authentication(
    //         String(user?.authentication?.salt),
    //         password
    //       );
    //       if (user?.authentication?.password != expectedHash) {
    //         return res.sendStatus(401);
    //       }
    //       const token = createJwtToken(user);
    //       return res
    //         .cookie("jwt-token", token, {
    //           httpOnly: true,
    //           secure: true,
    //           sameSite: "none",
    //         })
    //         .sendStatus(200);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     return res.sendStatus(500);
    //   }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   try {
    //     const { email, password, username } = req.body;
    //     const existingUser = await getUserByEmail(email);
    //     if (existingUser) {
    //       return res.sendStatus(400);
    //     }
    //     const salt = random();
    //     await createUser({
    //       email,
    //       username,
    //       authentication: {
    //         salt,
    //         password: authentication(salt, password),
    //       },
    //     });
    //     return res.sendStatus(200);
    //   } catch (error) {
    //     console.log(error);
    //     return res.sendStatus(500);
    //   }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   try {
    //     res.clearCookie("jwt-token", {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: "none",
    //     });
    //     return res.sendStatus(200);
    //   } catch (error) {
    //     console.log(error);
    //     return res.sendStatus(400);
});
exports.logout = logout;
// };
