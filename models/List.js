const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
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
			status: {
				type: String,
				enum: ["complete", "incomplete"],
			},
		},
	],
});

listSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await mongoose
			.model("User")
			.findByIdAndUpdate(doc.creator, { $pull: { lists: doc._id } });
	}
});

module.exports = mongoose.model("List", listSchema);
