const mongoose = require("mongoose");
const { Schema } = mongoose;

const notepadSchema = new Schema({
	title: {
		type: String,
		required: [true, "Please enter a title for your list."],
	},
	category: {
		type: String,
	},
	created: {
		type: Date,
		required: true,
	},
	modified: {
		type: Date,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	shared: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
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
			complete: {
				type: Boolean,
			},
		},
	],
});

notepadSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await mongoose
			.model("User")
			.findByIdAndUpdate(doc.creator, { $pull: { notepads: doc._id } });
	}
});

module.exports = mongoose.model("Notepad", notepadSchema);
