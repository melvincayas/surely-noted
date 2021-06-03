const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.get("/onload", authControllers.onLoad);

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

module.exports = router;
