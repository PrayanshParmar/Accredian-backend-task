import { transport } from "./mail-cofig";

export const sendCourseReferralEmail = async (
  recipientName: string,
  recipientEmail: string,
  referrerEmail: string,
  courseName: string,
  referralLink: string
) => {
  const emailContent = `
    <p>Hi ${recipientName},</p>
    <p>${referrerEmail} has referred you to our exciting course: <strong>${courseName}</strong>. This is a fantastic opportunity to enhance your skills and knowledge.</p>
    <p>By signing up through the link below, you’ll gain access to this course and all its benefits. Plus, ${referrerEmail} will earn rewards for referring you!</p>
    <p><a href="${referralLink}" style="color: #1a73e8; text-decoration: none;">Join the ${courseName} Course Now</a></p>
    <p>Don’t miss out on this chance to advance your career with our expert-led course. Click the link and start learning today!</p>
    <p>If you have any questions or need further information, feel free to reply to this email.</p>
    <p>Best regards,<br>The Accredian Team</p>
  `;

  await transport.sendMail({
    from: "Accredian <parmarprayansh2@gmail.com>",
    to: recipientEmail,
    subject: `You're Invited to Join ${courseName}!`,
    html: emailContent,
  });
};
