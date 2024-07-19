import express from "express";

import { ReferFriend } from "../controllers/refer";
import { isAuthenticated } from "../middleware/authenticate";
import validateRequest from "../middleware/validate-request";

export default (router: express.Router) => {
  router.post(
    "/api/refer/refer-friend",
    isAuthenticated,
    validateRequest,
    ReferFriend
  );
};
