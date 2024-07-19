import express from "express";

import authentication from "./authentication";
import refer from "./refer";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  refer(router);

  return router;
};
