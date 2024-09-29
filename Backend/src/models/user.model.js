import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

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

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateRefreshToken = async function () {
	this.refreshToken = jsonwebtoken.sign(
		{
			_id: this._id,
			username: this.username,
			email: this.email,
		},
		`${process.env.REFRESH_TOKEN_SECTET}`,
		{ expiresIn: `${process.env.REFRESH_TOKEN_EXP}` } //got an error, stating that env values were not properly imported so all i did was enlcoing it with ``
	);
};

userSchema.methods.generateAccessToken = async function () {
	this.refreshToken = jsonwebtoken.sign(
		{
			_id: this._id,
		},
		`${process.env.ACCESSS_TOKEN_SECTET}`,
		{ expiresIn: `${process.env.ACCESS_TOKEN_EXP}` }
	);
};

export const UserModel = mongoose.model("User", userSchema);
