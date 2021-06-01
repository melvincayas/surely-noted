require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");

mongoose
	.connect("mongodb://localhost:27017/todoapp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("Connected to MongoDB!"))
	.catch(err => console.log("Error in MongoDB!", err));

app.use(
	session({
		secret: "temporarysecret",
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});

app.post("/register", async (req, res, next) => {
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
					response: { type: "success", user },
				});
			});
		});
	} catch (err) {
		res.status(500).json({
			response: {
				type: "error",
				message: "Something went wrong on our end. Please try again.",
			},
		});
	}
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		req.session.user = user;
		res.status(200).json({ response: { type: "success", user } });
	} catch (err) {
		res.status(500).json({
			response: {
				type: "error",
				message: "Something went wrong on our end. Please try again.",
			},
		});
	}
});

app.post("/logout", async (req, res) => {
	req.session.destroy();
	res.status(200).json({
		response: { type: "success" },
	});
});

app.listen(5000, () => {
	console.log("Listening on Port 5000!");
});
