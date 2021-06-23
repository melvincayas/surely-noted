const express = require("express");
const router = express.Router();
const listControllers = require("../controllers/list");
const listItemControllers = require("../controllers/list-item");
const { validateListUser } = require("../public/utilities/middleware");

router
	.route("/")
	.get(listControllers.onLoad)
	.post(listControllers.newList)
	.delete(listControllers.deleteList);

// view specific list
router.get("/:listId", validateListUser, listControllers.viewOneList);

// Items within Lists
router.post("/:listId/add", validateListUser, listItemControllers.newListItem);

router
	.route("/:listId/:itemId")
	.delete(validateListUser, listItemControllers.deleteListItem)
	.patch(validateListUser, listItemControllers.editListItem);

module.exports = router;
