import express from "express";
import { deleteUser, getUser, getUsers } from "../controller/userController.js";

const router = express.Router();

router.delete("/:id", deleteUser);
router.get("/getUser/:id", getUser);
router.get("/getUsers", getUsers);

export default router;
