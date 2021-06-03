require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");

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

app.use(express.static(path.join(__dirname, "public")));
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

app.use("/user", authRoutes);
app.use("/list", listRoutes);

app.use((err, req, res, next) => {
	const errMsg = "Something went wrong on our end. Please try again.";
	const { status = 500, message = errMsg } = err;
	res.status(status).json({ response: { type: "error", message } });
});

app.listen(5000, () => {
	console.log("Listening on Port 5000!");
});
