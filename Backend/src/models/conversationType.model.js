//THIS MODEL SHALL NOT BE USED!

import mongoose from "mongoose";
import { Schema } from "mongoose";

const chat_object = new Schema(
	{
		all_messages: [
			{
				type: Schema.Types.ObjectId,
				ref: "MessageModel",
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Chat_object = mongoose.model("chat_object", chat_object);

// {
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	conversationType: {
// 		type: String,
// 		required: true,
// 		enum: ["group", "direct", "global"],
// 	},
// 	paritipantsID: [
// 		{
// 			type: Schema.Types.ObjectId,
// 			ref: "UserModel",
// 			required: false,
// 		},
// 	],
// 	conversation_image: {
// 		type: String,
// 		default: "Backend\\public\\default_Images", //I will change it back in the future
// 	},
// 	all_messages: {
// 		type: Schema.Types.ObjectId,
// 		ref: "MessageModel",
// 	},
// 	isGlobal: {
// 		type: Boolean,
// 		default: false,
// 	},
// 	description: {
// 		type: String,
// 		default: "",
// 	},
// },
// {
// 	timestamps: true,
// }
// );
