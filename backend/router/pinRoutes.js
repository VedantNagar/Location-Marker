import express from "express";
import { createPin, deletePins, getPins } from "../controller/pinController.js";

const router = express.Router();

router.post("/", createPin);
router.get("/:userId", getPins);
router.delete("/:userId", deletePins);

export default router;
