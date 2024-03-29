import seedController from "../controllers/seed.controller";

const express = require("express");
const router = express.Router();

router.get("/reset", seedController.resetDb);
router.get("/:amount", seedController.seedDb);

export default router;