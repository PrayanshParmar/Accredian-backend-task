import express from "express";
import { ZodError, z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string()
    .min(4, "Mininum 4 character's is required")
    .max(30, "Password can be upto 30 character's"),
});

const registrationSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string()
    .min(4, "Mininum 4 character's is required")
    .max(30, "Password can be upto 30 character's"),
});

export const referSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email("Email is required"),
  programs: z.string(),
});

const validateRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userInput = req.body;

  try {
    let result;

    if (req.path === "/api/auth/register") {
      result = registrationSchema.parse(userInput);
    } else if (req.path === "/api/auth/login") {
      result = loginSchema.parse(userInput);
    } else if (req.path === "/api/refer/refer-friend") {
      result = referSchema.parse(userInput);
    }
    (req as any).user = result;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationIssues = error.errors.map((issue) => {
        return {
          validation: issue.path[0],
          error: issue.message,
        };
      });

      res.status(400).json({ error: validationIssues });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default validateRequest;
