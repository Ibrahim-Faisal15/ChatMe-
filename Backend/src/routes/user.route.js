import { Router } from "express";
import {
	getAllChatLogs,
	isLoggedIn,
	loginUser,
	logoutUser,
	registerUser,
	setStatus,
} from "../contollers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/isLoggedIn").get(isLoggedIn);

//Safe routes
router.route("/get-all-chatLogs").get(authMiddleware, getAllChatLogs);
router.route("/logout").get(authMiddleware, logoutUser);
router.route("/set-status").post(authMiddleware, setStatus);

export default router;
