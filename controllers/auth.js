const User = require("../models/User");
const passport = require("passport");
const ErrorHandler = require("../public/utilities/ErrorHandler");

module.exports.register = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const newUser = new User({ email, name });
		await User.register(newUser, password, async function (err, user) {
			if (err) {
				return next(new ErrorHandler(err.status, err.message));
			}
			await user.save();
			req.login(user, err => {
				if (err) return next(new ErrorHandler(err.status, err.message));
				req.session.user_id = user._id;
				res.status(200).json({
					response: { type: "success", user, session_id: req.sessionID },
				});
			});
		});
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.onLoad = async (req, res, next) => {
	try {
		const { user_id } = req.session;
		const user = await User.findOne({ _id: user_id });
		res
			.status(200)
			.json({ response: { type: "success", user, session_id: req.sessionID } });
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.login = async (req, res, next) => {
	try {
		passport.authenticate("local", function (err, user, info) {
			if (err) {
				return next(new ErrorHandler(err.status, err.message));
			}
			if (!user) {
				return next(
					new ErrorHandler(401, "Username and/or password is invalid.")
				);
			}
			req.login(user, err => {
				if (err) return next(new ErrorHandler(err.status, err.message));
				req.session.user_id = user._id;
				res.status(200).json({
					response: { type: "success", user, session_id: req.sessionID },
				});
			});
		})(req, res, next);
	} catch (err) {
		next(new ErrorHandler(err.status, err.message));
	}
};

module.exports.logout = async (req, res) => {
	req.session.destroy();
	res.status(200).json({
		response: { type: "success" },
	});
};
