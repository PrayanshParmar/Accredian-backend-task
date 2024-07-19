import express from "express";
import { db } from "../db/prisma";
import { createJwtToken } from "../lib/jwt";
import { authentication } from "../lib/salt";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    } else {
      const salt = process.env.SALT_SECRET || "SALT_SECRET";
      const expectedHash = authentication(salt, password);
      if (user?.password != expectedHash) {
        return res.status(401).json({ error: "Invalid Credentials!" });
      }
      const token = createJwtToken(user);
      res.cookie("jwt-token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Logged in succesfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already existed!" });
    }
    const salt = process.env.SALT_SECRET || "SALT_SECRET";

    await db.user.create({
      data: {
        email,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json({ message: "User created succesfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (_: express.Request, res: express.Response) => {
  try {
    res.clearCookie("jwt-token", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const verify = async (_: express.Request, res: express.Response) => {
  try {
    const isExpired = false;

    return res
      .status(200)
      .json({ message: "Token is verified", isExpired: isExpired });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
