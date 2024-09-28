// import asyncHandler from ".././utils/asyncHandler.utils.js";
import ApiError from ".././utils/apiError.utils.js";
import ApiResponse from ".././utils/apiResponse.utils.js";
import { UserModel } from "../models/user.model.js";
import asyncHandler from ".././utils/asyncHandler.utils.js";

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

	const { username, email, password } =
		req.body || req.query;

	console.log(req.body);

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

	console.log(21);

	const User = await UserModel.create({
		username: username,
		email: email,
		password: password,
		coverImage: "",
		profileImage:
			"https://www.gravatar.com/avatar/md5?d=identicon&s=200&r=pg",
		status: "inactive",
		refreshToken: "",
	});

	if (!User) {
		throw new ApiError(500, "Error creating user");
	}

	const isUserCreated = await UserModel.findOne(
		User._id
	).select("-password -refreshToken");

	if (!isUserCreated) {
		throw new ApiError(500, "Error fetching user");
	}

	console.log(isUserCreated, 12);

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				isUserCreated,
				"User created successfully"
			)
		);
});

export { registerUser };
