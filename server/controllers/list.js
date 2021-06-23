const User = require("../models/User");
const List = require("../models/List");
const catchAsync = require("../public/utilities/catchAsync");
const ErrorHandler = require("../public/utilities/ErrorHandler");

module.exports.onLoad = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const lists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", lists: lists } });
});

module.exports.viewOneList = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { listId } = req.params;
	// include error handling for verifying user owns the list
	const list = await List.findOne({ _id: listId });
	res.status(200).json({ response: { type: "success", list } });
});

module.exports.newList = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { title, category } = req.body;
	const user = await User.findOne({ _id: user_id });
	const newList = new List({
		title,
		category,
		created: new Date().toUTCString(),
		creator: user,
	});
	user.lists.push(newList._id);
	await user.save();
	await newList.save();
	const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", lists: userLists } });
});

module.exports.deleteList = catchAsync(async (req, res, next) => {
	const { id } = req.body;
	const { user_id } = req.session;
	await List.findOneAndDelete({ _id: id });
	const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", lists: userLists } });
});

module.exports.newListItem = catchAsync(async (req, res, next) => {
	const { listId } = req.params;
	const { content } = req.body;
	const { user_id } = req.session;
	const newItem = {
		date: new Date().toUTCString(),
		content,
		status: "incomplete",
	};
	const list = await List.findOne({ _id: listId });
	list.items.push(newItem);
	await list.save();
	// const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", list } });
});

module.exports.deleteListItem = catchAsync(async (req, res, next) => {
	const { listId, itemId } = req.params;
	const { user_id } = req.session;
	await List.findByIdAndUpdate(listId, {
		$pull: { items: { _id: itemId } },
	});
	const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", lists: userLists } });
});

module.exports.editListItem = catchAsync(async (req, res, next) => {
	const { listId, itemId } = req.params;
	const { editedContent } = req.body;
	const { user_id } = req.session;

	await List.findByIdAndUpdate(
		listId,
		{ $set: { "items.$[el].content": editedContent } },
		{
			arrayFilters: [{ "el._id": itemId }],
			new: true,
		}
	);
	const userLists = await List.find({ creator: user_id });
	res.status(200).json({ response: { type: "success", lists: userLists } });
});
