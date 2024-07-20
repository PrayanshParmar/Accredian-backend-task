import { google } from "googleapis"; // Correct import for googleapis
import nodemailer from "nodemailer";

const client_id = process.env.GOOGLE_MAIL_CLIENT_ID;
const client_secret = process.env.GOOGLE_MAIL_CLIENT_SECRET;
const client_redirect_url = process.env.GOOGLE_MAIL_REDIRECT_URL;
const client_refersh_token = process.env.GOOGLE_MAIL_REFERSH_TOKEN;

export const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  client_redirect_url
);

oAuth2Client.setCredentials({ refresh_token: client_refersh_token });

const AccessToken = oAuth2Client.getAccessToken;

export const transport = nodemailer.createTransport({
  //@ts-ignore
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "parmarprayansh2@gmail.com",
    clientId: client_id,
    clientSecret: client_secret,
    refreshToken: client_refersh_token,
    accessToken: AccessToken,
  },
});
