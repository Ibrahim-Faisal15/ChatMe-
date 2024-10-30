import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		senderID: {
			type: Schema.Types.ObjectId,
			ref: "UserModel",
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const MessageModel = mongoose.model("MessageModel", messageSchema);
