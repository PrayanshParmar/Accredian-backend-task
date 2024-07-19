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
exports.ReferFriend = void 0;
const prisma_1 = require("../db/prisma");
const mail_1 = require("../lib/mail/mail");
const ReferFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, programs } = req.body;
        const userData = req.userdata;
        if (!userData) {
            return res.status(400).json({ error: "Bad reuest!" });
        }
        const existingReferral = yield prisma_1.db.refer.findFirst({
            where: {
                userId: userData.id,
                email: email,
                program: programs,
            },
        });
        if (existingReferral) {
            return res
                .status(400)
                .json({ error: "Referral already exists for this program!" });
        }
        const referralLink = "http://localhost:3000/referral?code=UNIQUE_CODE";
        yield prisma_1.db.refer.create({
            data: {
                name: name,
                userId: userData.id,
                email: email,
                program: programs,
            },
        });
        (0, mail_1.sendCourseReferralEmail)(name, email, userData.email, programs, referralLink);
        return res
            .status(200)
            .json({ message: "Yup, We have send a referral email to your friend!" });
    }
    catch (error) {
        console.error("Error processing referral:", error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});
exports.ReferFriend = ReferFriend;
