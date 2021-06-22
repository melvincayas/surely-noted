const express = require("express");
const router = express.Router();
const listControllers = require("../controllers/list");

// get all lists on refresh
router.get("/onload", listControllers.onLoad);

// Lists
router.get("/:listId", listControllers.viewOneList);
router.post("/new", listControllers.newList);
router.delete("/delete", listControllers.deleteList);

// Items within Lists
router.post("/:listId/add", listControllers.newListItem);
router
	.route("/:listId/:itemId")
	.delete(listControllers.deleteListItem)
	.patch(listControllers.editListItem);

module.exports = router;
