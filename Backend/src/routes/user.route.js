import { Router } from "express";
import { isLoggedIn, loginUser, registerUser } from "../contollers/user.controller.js";

const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/isLoggedIn").get(isLoggedIn);

export default router;
