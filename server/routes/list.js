const express = require("express");
const router = express.Router();
const listControllers = require("../controllers/list");
const listItemControllers = require("../controllers/list-item");

router
	.route("/")
	.get(listControllers.onLoad)
	.post(listControllers.newList)
	.delete(listControllers.deleteList);

// view specific list
router.get("/:listId", listControllers.viewOneList);

// Items within Lists
router.post("/:listId/add", listItemControllers.newListItem);
router
	.route("/:listId/:itemId")
	.delete(listItemControllers.deleteListItem)
	.patch(listItemControllers.editListItem);

module.exports = router;
