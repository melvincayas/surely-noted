const express = require("express");
const router = express.Router();
const listControllers = require("../controllers/list");

router
	.route("/")
	.get(listControllers.onLoad)
	.post(listControllers.newList)
	.delete(listControllers.deleteList);

// view specific list
router.get("/:listId", listControllers.viewOneList);

// Items within Lists
router.post("/:listId/add", listControllers.newListItem);
router
	.route("/:listId/:itemId")
	.delete(listControllers.deleteListItem)
	.patch(listControllers.editListItem);

module.exports = router;
