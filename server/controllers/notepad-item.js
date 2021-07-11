const Notepad = require("../models/Notepad");
const catchAsync = require("../public/utilities/catchAsync");

module.exports.newNotepadItem = catchAsync(async (req, res, next) => {
	const { notepadId } = req.params;
	const { user_id } = req.session;
	const { content } = req.body;
	const newItem = {
		date: new Date().toUTCString(),
		content,
		status: "incomplete",
	};
	const notepad = await Notepad.findByIdAndUpdate(notepadId, {
		$set: { modified: new Date().toUTCString() },
	});
	notepad.items.push(newItem);
	await notepad.save();
	const userNotepads = await Notepad.find({ creator: user_id });
	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});

module.exports.deleteNotepadItem = catchAsync(async (req, res, next) => {
	const { notepadId, itemId } = req.params;
	const { user_id } = req.session;
	await Notepad.findByIdAndUpdate(notepadId, {
		$pull: { items: { _id: itemId } },
		$set: { modified: new Date().toUTCString() },
	});
	const userNotepads = await Notepad.find({ creator: user_id });
	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});

module.exports.editNotepadItem = catchAsync(async (req, res, next) => {
	const { notepadId, itemId } = req.params;
	const { user_id } = req.session;
	const { editedContent } = req.body;
	await Notepad.findByIdAndUpdate(
		notepadId,
		{ $set: { "items.$[el].content": editedContent } },
		{
			arrayFilters: [{ "el._id": itemId }],
			new: true,
		}
	);
	const userNotepads = await Notepad.find({ creator: user_id });
	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});
