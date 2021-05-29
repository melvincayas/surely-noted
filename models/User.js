const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	lists: [
		{
			type: Schema.Types.ObjectId,
			ref: "List",
		},
	],
	shared: [
		{
			type: Schema.Types.ObjectId,
			ref: "List",
		},
	],
});

module.exports = mongoose.model("User", userSchema);
