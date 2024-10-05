import { Router } from "express";
import {
	getAllChatLogs,
	isLoggedIn,
	loginUser,
	registerUser,
} from "../contollers/user.controller.js";

const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/isLoggedIn").get(isLoggedIn);
router.route("/get-all-chatLogs").get(getAllChatLogs);

export default router;
