import express from "express";
import { User } from "../models/user.js";
import { login, register, getMyProfile, logout } from "../Controllers/user.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/myProfile", isAuthenticated, getMyProfile);

router.get("/logout", isAuthenticated, logout);

export default router;
