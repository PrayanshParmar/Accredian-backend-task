import express from "express";
import { verifyJwtToken } from "../lib/jwt";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const jwtToken = req.cookies["jwt-token"];

    if (!jwtToken) {
      return res
        .status(400)
        .json({ error: "No token provided, authorization denied." });
    }
    const verify = verifyJwtToken(jwtToken);

    if (!verify) {
      return res
        .status(400)
        .json({ error: "Invalid token, authorization denied." });
    }
    (req as any).user = verify;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
