import express from "express";
import { db } from "../db/prisma";
import { sendCourseReferralEmail } from "../mail/mail";

type user = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export const ReferFriend = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, programs } = req.body;

    const userData: user = (req as any).userdata;
    if (!userData) {
      return res.status(400).json({ error: "Bad reuest!" });
    }

    const existingReferral = await db.refer.findFirst({
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

    await db.refer.create({
      data: {
        name: name,
        userId: userData.id,
        email: email,
        program: programs,
      },
    });

    sendCourseReferralEmail(
      name,
      email,
      userData.email,
      programs,
      referralLink
    );

    return res
      .status(200)
      .json({ message: "Yup, We have send a referral email to your friend!" });
  } catch (error) {
    console.error("Error processing referral:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};
