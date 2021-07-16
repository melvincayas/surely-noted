const User = require("../models/User");
const Notepad = require("../models/Notepad");
const catchAsync = require("../public/utilities/catchAsync");

module.exports.shareNotepad = catchAsync(async (req, res, next) => {
	const { notepadId } = req.params;
	const { user_id } = req.session;
	const { enteredEmail } = req.body;

	const notepadToShare = await Notepad.findById(notepadId).populate("creator");
	const [foundUserToShareWith] = await User.find({ email: enteredEmail });

	notepadToShare.shared.push(foundUserToShareWith._id);
	await notepadToShare.save();

	const user = await User.findById(user_id);
	user.shared.push(notepadToShare._id);
	await user.save();

	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});

	res
		.status(200)
		.json({ response: { ype: "success", notepads: userNotepads } });
});
