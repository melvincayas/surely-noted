const Notepad = require("../models/Notepad");
const catchAsync = require("../public/utilities/catchAsync");

module.exports.newNotepadItem = catchAsync(async (req, res, next) => {
	const { notepadId } = req.params;
	const { user_id } = req.session;
	const { content } = req.body;

	const newItem = {
		date: new Date().toUTCString(),
		content,
		complete: false,
	};

	const notepad = await Notepad.findByIdAndUpdate(notepadId, {
		$set: { modified: new Date().toUTCString() },
	});

	notepad.items.push(newItem);
	await notepad.save();

	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});

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

	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});

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
		{
			$set: {
				"items.$[el].content": editedContent,
				modified: new Date().toUTCString(),
			},
		},
		{
			arrayFilters: [{ "el._id": itemId }],
		}
	);
	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});

	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});

module.exports.updateCompletionStatus = catchAsync(async (req, res, next) => {
	const { notepadId, itemId } = req.params;
	const { user_id } = req.session;
	const { completionStatus } = req.body;

	await Notepad.findByIdAndUpdate(
		notepadId,
		{
			$set: {
				"items.$[el].complete": completionStatus,
				modified: new Date().toUTCString(),
			},
		},
		{
			arrayFilters: [{ "el._id": itemId }],
		}
	);

	const userNotepads = await Notepad.find({
		$or: [{ creator: user_id }, { shared: { $in: [user_id] } }],
	});

	res
		.status(200)
		.json({ response: { type: "success", notepads: userNotepads } });
});
