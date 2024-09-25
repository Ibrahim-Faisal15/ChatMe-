import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		conversationID: {
			type: Schema.Types.ObjectId,
			ref: "ConversationModel",
		},
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

export const MessageModel = mongoose.model(
	"MessageModel",
	messageSchema
);
