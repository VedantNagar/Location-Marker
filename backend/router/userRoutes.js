import express from "express";
import {
  register,
  login,
  deleteUser,
  getUser,
  getUsers,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.get("/getUser/:id", getUser);
router.get("/getUsers", getUsers);

export default router;
