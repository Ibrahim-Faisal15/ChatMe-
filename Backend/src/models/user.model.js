import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

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
			type: String,
			required: true,
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

		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	// ALWAYS REMEMBER KIDDOS, USE FUNCTION KEYWORD NOT ARROW FUCNTION..
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

export const UserModel = mongoose.model("User", userSchema);
