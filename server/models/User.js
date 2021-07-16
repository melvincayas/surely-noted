const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please enter your name."],
	},
	notepads: [
		{
			type: Schema.Types.ObjectId,
			ref: "Notepad",
		},
	],
	shared: [
		{
			type: Schema.Types.ObjectId,
			ref: "Notepad",
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
