import express from "express";
import { createPin, deletePins, getPins } from "../controller/pinController.js";

const router = express.Router();

router.post("/", createPin);
router.get("/", getPins);
router.delete("/:id", deletePins);

export default router;
