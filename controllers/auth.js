const User = require("../models/User");
const passport = require("passport");

const serverError = {
	response: {
		type: "error",
		message: "Something went wrong on our end. Please try again.",
	},
};

const invalidUser = {
	response: {
		type: "error",
		message: "Username and/or password is invalid.",
	},
};

module.exports.register = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const newUser = new User({ email, name });
		await User.register(newUser, password, async function (err, user) {
			if (err) {
				return res.status(400).json({
					response: {
						type: "error",
						message: err.message,
					},
				});
			}
			await user.save();
			req.login(user, err => {
				if (err) return next(err);
				req.session.user = user;
				res.status(200).json({
					response: { type: "success", user, session_id: req.sessionID },
				});
			});
		});
	} catch (err) {
		res.status(500).json(serverError);
	}
};

module.exports.login = async (req, res, next) => {
	try {
		passport.authenticate("local", function (err, user, info) {
			if (err) {
				return res.status(500).json(serverError);
			}
			if (!user) {
				return res.status(401).json(invalidUser);
			}
			req.login(user, err => {
				if (err) return next(err);
				req.session.user = user;
				res.status(200).json({
					response: { type: "success", user, session_id: req.sessionID },
				});
			});
		})(req, res, next);
	} catch (err) {
		res.status(500).json(serverError);
	}
};

module.exports.logout = async (req, res) => {
	req.session.destroy();
	res.status(200).json({
		response: { type: "success" },
	});
};
