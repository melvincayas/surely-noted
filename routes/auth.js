const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

module.exports = router;
