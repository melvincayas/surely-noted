const List = require("../../models/List");
const catchAsync = require("./catchAsync");
const ErrorHandler = require("./ErrorHandler");

module.exports.validateListUser = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { listId } = req.params;
	const { creator } = await List.findOne({ _id: listId });

	if (user_id !== creator.toString()) {
		return next(new ErrorHandler(403, "This isn't yours!", "authorization"));
	}

	next();
});
