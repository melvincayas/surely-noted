const ErrorHandler = require("./ErrorHandler");

module.exports = fn => {
	return (req, res, next) => {
		fn(req, res, next).catch(err =>
			next(new ErrorHandler(err.status, err.message, "server"))
		);
	};
};
