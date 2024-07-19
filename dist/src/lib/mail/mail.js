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
exports.sendCourseReferralEmail = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendCourseReferralEmail = (recipientName, recipientEmail, referrerEmail, courseName, referralLink) => __awaiter(void 0, void 0, void 0, function* () {
    const emailContent = `
    <p>Hi ${recipientName},</p>
    <p>${referrerEmail} has referred you to our exciting course: <strong>${courseName}</strong>. This is a fantastic opportunity to enhance your skills and knowledge.</p>
    <p>By signing up through the link below, you’ll gain access to this course and all its benefits. Plus, ${referrerEmail} will earn rewards for referring you!</p>
    <p><a href="${referralLink}" style="color: #1a73e8; text-decoration: none;">Join the ${courseName} Course Now</a></p>
    <p>Don’t miss out on this chance to advance your career with our expert-led course. Click the link and start learning today!</p>
    <p>If you have any questions or need further information, feel free to reply to this email.</p>
    <p>Best regards,<br>The Accredian Team</p>
  `;
    yield resend.emails.send({
        from: "Accredian <accredian@hostiffy.xyz>",
        to: recipientEmail,
        subject: `You're Invited to Join ${courseName}!`,
        html: emailContent,
    });
});
exports.sendCourseReferralEmail = sendCourseReferralEmail;
