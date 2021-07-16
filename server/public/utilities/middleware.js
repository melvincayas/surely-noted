const Notepad = require("../../models/Notepad");
const User = require("../../models/User");
const catchAsync = require("./catchAsync");
const ErrorHandler = require("./ErrorHandler");

// this might not be necessary
// NotepadDetail only gets notepads in user's collection
module.exports.validateNotepadUser = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { notepadId } = req.params;
	const { creator } = await Notepad.findOne({ _id: notepadId });

	if (user_id !== creator.toString()) {
		return next(new ErrorHandler(403, "This isn't yours!", "authorization"));
	}

	next();
});

module.exports.validateUserToShareWith = catchAsync(async (req, res, next) => {
	const { notepadId } = req.params;
	const { enteredEmail } = req.body;

	const notepadToShare = await Notepad.findById(notepadId).populate("creator");
	const [foundUserToShareWith] = await User.find({ email: enteredEmail });

	if (enteredEmail === notepadToShare.creator.email) {
		return next(new ErrorHandler(400, "You own this notepad!", "share"));
	}

	if (!foundUserToShareWith) {
		return next(new ErrorHandler(400, "That e-mail doesn't exist!", "share"));
	}

	next();
});
