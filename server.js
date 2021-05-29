require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/todoapp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB!"))
	.catch(err => console.log("Error in MongoDB!", err));

app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
	res.send("test");
});

app.listen(5000, () => {
	console.log("Listening on Port 5000!");
});
