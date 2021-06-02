const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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

userSchema.plugin(passportLocalMongoose, {
	usernameField: "email",
	usernameUnique: true,
	usernameLowerCase: true,
	errorMessages: {
		UserExistsError: "A user with the given e-mail is already registered!",
	},
});

module.exports = mongoose.model("User", userSchema);
