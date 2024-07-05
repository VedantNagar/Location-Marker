import express from "express";
import { createPin, getPins } from "../controller/pinController.js";

const router = express.Router();

router.post("/", createPin);
router.get("/", getPins);

export default router;
