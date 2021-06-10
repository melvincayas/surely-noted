const express = require("express");
const router = express.Router();
const listControllers = require("../controllers/list");

router.get("/onload", listControllers.onLoad);

router.post("/new", listControllers.newList);

router.post("/delete", listControllers.deleteList);

router.post("/:listId/add", listControllers.addItem);

router
	.route("/:listId/:itemId")
	.delete(listControllers.deleteItem)
	.patch(listControllers.editItem);

module.exports = router;
