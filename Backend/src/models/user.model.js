import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: string,
			required: [true, "Password is required"],
		},
		coverImage: {
			type: String,
			default: "Backend\\public\\default_Images", //I will change it back in the future
		},
		profileImage: {
			type: String,
			default: "Backend\\public\\default_Images", //I will change it back in the future
		},

		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "inactive",
		},
	},
	{ timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
