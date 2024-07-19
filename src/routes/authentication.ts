import express from "express";

import { login, register, logout, verify } from "../controllers/authentication";
import validateRequest from "../middleware/validate-request";
import { isAuthenticated } from "../middleware/authenticate";

export default (router: express.Router) => {
  router.post("/api/auth/register", validateRequest, register);
  router.post("/api/auth/login", validateRequest, login);
  router.post("/api/auth/logout", logout);
  router.get("/api/auth/verify-token", isAuthenticated, verify);
};
