import ApiError from ".././utils/apiError.utils.js";
import ApiResponse from ".././utils/apiResponse.utils.js";
import { UserModel } from "../models/user.model.js";
import asyncHandler from ".././utils/asyncHandler.utils.js";
import { Chat_object } from "../models/conversationType.model.js";

const generateAccessToken_and_RefreshToken = async (user_id) => {
	try {
		const user = await UserModel.findById(user_id);
		if (!user) throw new ApiError(404, "User not found");

		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		user.refreshToken = refreshToken;

		await user.save({ validateBeforeSave: false });
		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, "Error generating access token and refresh token");
	}
};

const registerUser = asyncHandler(async (req, res) => {
	// Alogristhm was registering user
	// Take user data, "Username, email and password"
	//check if user have filled all the required fields
	//check user is already registered
	//if already registered then return an error
	//if not then hash the password
	//save to the databse

	//remove passworf and refresh token from the response.
	// Send back a success response with user data
	//redirect to the login page

	const { username, email, password } = req.body || req.query;

	if (
		[username, email, password].some((data) => {
			data?.trim() == "";
		})
	) {
		throw new ApiError(400, "All fields are required");
	}

	const userExists = await UserModel.findOne({
		$or: [{ username: username }, { email: email }],
	});

	if (userExists) {
		throw new ApiError(400, "User already exists");
	}

	const User = await UserModel.create({
		username: username,
		email: email,
		password: password,
		coverImage: "",
		profileImage: "https://www.gravatar.com/avatar/md5?d=identicon&s=200&r=pg",
		status: "inactive",
		refreshToken: "",
	});

	if (!User) {
		throw new ApiError(500, "Error creating user");
	}

	const isUserCreated = await UserModel.findOne(User._id).select("-password -refreshToken");

	if (!isUserCreated) {
		throw new ApiError(500, "Error fetching user");
	}

	return res.status(200).json(new ApiResponse(200, isUserCreated, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
	/*
		User Login Algorithm
		take username and password from user.
		check if user exists in the database.
		if not exists throw and error
		if then compare the username with stored username 
		comapre password with stored hash password.
		if password is correct generate a refresh token access token.
		send accestoken as a cookie
	*/

	const { username, password } = req.body;

	if (!(username && password)) {
		throw new ApiError(400, "All fields are required");
	}

	const user = await UserModel.findOne({
		username: username,
	});

	if (!user) {
		throw new ApiError(401, "Invalid credentials");
	}

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "Invalid password");
	}

	const { accessToken, refreshToken } = await generateAccessToken_and_RefreshToken(user._id);

	const LogInUser = await UserModel.findOne(user._id).select("-password -refreshToken");

	return res
		.status(200)
		.cookie("access_token", accessToken)
		.json(new ApiResponse(200, LogInUser, "Logged in successfully"));
});

const isLoggedIn = asyncHandler(async (req, res) => {
	const token = req?.cookies;

	if (Object.keys(token).length === 0) {
		return res.status(200).json(new ApiResponse(200, null, "Not logged in"));
	} else {
		return res.status(200).json(new ApiResponse(200, null, "Logged in"));
	}
});

const getAllChatLogs = asyncHandler(async (req, res) => {
	res.json(new ApiResponse(200, req.user, "Verified"));
});

const logoutUser = asyncHandler(async (req, res) => {
	await UserModel.findByIdAndUpdate(
		req.user?._id,
		{
			$unset: {
				refreshToken: 1,
			},
		},
		{
			new: true,
		}
	);
	return res
		.status(200)
		.clearCookie("access_token")
		.json(new ApiResponse(200, {}, "User logged out successfully"));
});

const setStatus = asyncHandler(async (req, res) => {
	const { username, status } = req.body;

	if (!(username && status)) {
		throw new ApiError(400, "Username or status is required");
	}
	const user = await UserModel.findOneAndUpdate(
		{
			username,
		},
		{
			$set: {
				status,
			},
		},
		{
			new: true,
		}
	);

	if (!user) {
		throw new ApiError(404, "User not found");
	}

	return res.status(200).json(new ApiResponse(200, user.status, "Status updated successfully"));
});

const fetch_messages = asyncHandler(async (req, res) => {
	const chat_object_exists = await Chat_object.find();
	if (chat_object_exists.length === 0 || !chat_object_exists) {
		const chat_object = await Chat_object.create({
			all_messages: [],
		});
		await chat_object.save();
		console.log("Chat object created successfully");
	} else {
		console.log("Chat object already exists");
	}
	const chat_object = await Chat_object.find();
	console.log(chat_object);
});

export {
	registerUser,
	loginUser,
	isLoggedIn,
	getAllChatLogs,
	logoutUser,
	setStatus,
	fetch_messages,
};
