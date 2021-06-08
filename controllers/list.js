const User = require("../models/User");
const List = require("../models/List");
const ErrorHandler = require("../public/utilities/ErrorHandler");

module.exports.onLoad = async (req, res, next) => {
	try {
		const { user_id } = req.session;
		const lists = await List.find({ creator: user_id });
		return res
			.status(200)
			.json({ response: { type: "success", lists: lists } });
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.newList = async (req, res, next) => {
	try {
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

		return res.status(200).json({ response: { type: "success", newList } });
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.deleteList = async (req, res, next) => {
	try {
		const { id } = req.body;
		await List.findOneAndDelete({ _id: id });
		res.status(200).json({ response: { type: "success" } });
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.addItem = async (req, res, next) => {
	try {
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
		const userLists = await List.find({ creator: user_id });
		res.status(200).json({ response: { type: "success", lists: userLists } });
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.deleteItem = async (req, res, next) => {
	try {
		const { listId, itemId } = req.params;
		const { user_id } = req.session;
		await List.findByIdAndUpdate(listId, {
			$pull: { items: { _id: itemId } },
		});
		const userLists = await List.find({ creator: user_id });
		res.status(200).json({ response: { type: "success", lists: userLists } });
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.editItem = async (req, res, next) => {
	try {
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};
