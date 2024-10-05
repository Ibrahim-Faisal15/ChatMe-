import { UserModel } from "../models/user.model.js";
import ApiError from "../utils/apiError.utils";
import asyncHandler from "../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";

const verifyjwt = asyncHandler(async (req, _, next) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) {
			throw new ApiError(400, "Unauthorized request");
		}

		const decodedToken = jwt.verify(token, process.env.ACCESSTOKEN_TOKEN_SECRET);

		const user = await UserModel.findById(decodedToken._id).select("-password -refreshToken");

		if (!user) {
			throw new ApiError(404, "User not found");
		}

		req.user = user;
		next();
	} catch (error) {
		throw new ApiError(401, error.message || "Unexpected error");
	}
});
