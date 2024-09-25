import mongoose from "mongoose";
import { Schema } from "mongoose";

const conversationSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		conversationType: {
			type: String,
			required: true,
			enum: ["group", "direct", "global"],
		},
		paritipantsID: [
			{
				type: Schema.Types.ObjectId,
				ref: "UserModel",
				required: false,
			},
		],
		Conversation_image: {
			type: String,
			default: "Backend\\public\\default_Images", //I will change it back in the future
		},
		lastMessage: {
			type: Schema.Types.ObjectId,
			ref: "Message",
		},
		isGlobal: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

export const ConversationModel = mongoose.model(
	"ConversationModel",
	conversationSchema
);
