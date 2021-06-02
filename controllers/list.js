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
			shared: user,
		});
		await newList.save();

		return res.status(200).json({ response: { type: "success", newList } });
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};
