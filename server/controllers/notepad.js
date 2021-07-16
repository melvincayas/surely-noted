const User = require("../models/User");
const Notepad = require("../models/Notepad");
const catchAsync = require("../public/utilities/catchAsync");

module.exports.onLoad = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});
	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});

module.exports.newNotepad = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { title, category } = req.body;
	const user = await User.findOne({ _id: user_id });
	const newNotepad = new Notepad({
		title,
		category,
		created: new Date().toUTCString(),
		modified: new Date().toUTCString(),
		creator: user,
	});
	user.notepads.push(newNotepad._id);
	await user.save();
	await newNotepad.save();
	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});
	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});

module.exports.deleteNotepad = catchAsync(async (req, res, next) => {
	const { id } = req.body;
	const { user_id } = req.session;
	await Notepad.findOneAndDelete({ _id: id });
	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});
	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});

module.exports.editNotepad = catchAsync(async (req, res, next) => {
	const { notepadId } = req.params;
	const { title, category } = req.body;
	const { user_id } = req.session;

	await Notepad.findByIdAndUpdate(
		{ _id: notepadId },
		{ $set: { title, category, modified: new Date().toUTCString() } }
	);

	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});

	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});
