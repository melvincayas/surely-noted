const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
	},
	created: {
		type: Date,
		required: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	shared: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	items: [
		{
			date: {
				type: Date,
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				enum: ["complete", "incomplete"],
			},
		},
	],
});
