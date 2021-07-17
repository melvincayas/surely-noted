const Notepad = require("../../models/Notepad");
const User = require("../../models/User");
const catchAsync = require("./catchAsync");
const ErrorHandler = require("./ErrorHandler");

module.exports.validateNotepadUser = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { notepadId } = req.params;
	const { creator, shared } = await Notepad.findOne({ _id: notepadId });

	const userIsBeingSharedWith = shared.find(
		user => user.toString() === user_id.toString()
	);

	if (user_id !== creator.toString() && !userIsBeingSharedWith) {
		return next(new ErrorHandler(403, "This isn't yours!", "authorization"));
	}

	next();
});

module.exports.validateUserToShareWith = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { notepadId } = req.params;
	const { enteredEmail } = req.body;

	const userSharingNotepad = await User.findById(user_id);
	const notepad = await Notepad.findById(notepadId).populate("creator");
	const [userToShareWith] = await User.find({ email: enteredEmail });

	const userEnteredTheirOwnEmail = userSharingNotepad.email === enteredEmail;

	if (userEnteredTheirOwnEmail) {
		return next(new ErrorHandler(400, "You own this notepad!", "share"));
	}

	if (!userToShareWith) {
		return next(new ErrorHandler(400, "That e-mail doesn't exist!", "share"));
	}

	const foundUserInSharedGroup = notepad.shared.find(
		user => user._id.toString() === userToShareWith._id.toString()
	);

	if (foundUserInSharedGroup) {
		return next(
			new ErrorHandler(
				400,
				"Notepad is already being shared with that user!",
				"share"
			)
		);
	}

	next();
});
