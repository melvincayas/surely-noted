const List = require("../models/List");
const catchAsync = require("../public/utilities/catchAsync");

module.exports.newListItem = catchAsync(async (req, res, next) => {
	const { listId } = req.params;
	const { user_id } = req.session;
	const { content } = req.body;
	const newItem = {
		date: new Date().toUTCString(),
		content,
		status: "incomplete",
	};
	const list = await List.findOne({ _id: listId });
	list.items.push(newItem);
	await list.save();
	const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", notepads: userLists } });
});

module.exports.deleteListItem = catchAsync(async (req, res, next) => {
	const { listId, itemId } = req.params;
	const { user_id } = req.session;
	await List.findByIdAndUpdate(
		listId,
		{
			$pull: { items: { _id: itemId } },
		},
		{ new: true }
	);
	const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", notepads: userLists } });
});

module.exports.editListItem = catchAsync(async (req, res, next) => {
	const { listId, itemId } = req.params;
	const { user_id } = req.session;
	const { editedContent } = req.body;
	await List.findByIdAndUpdate(
		listId,
		{ $set: { "items.$[el].content": editedContent } },
		{
			arrayFilters: [{ "el._id": itemId }],
			new: true,
		}
	);
	const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", notepads: userLists } });
});
