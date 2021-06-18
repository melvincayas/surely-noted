const express = require("express");
const router = express.Router();
const listControllers = require("../controllers/list");

router.get("/onload", listControllers.onLoad);

// Lists
router.post("/new", listControllers.newList);
router.delete("/delete", listControllers.deleteList);

// Items within Lists
router.post("/:listId/add", listControllers.newListItem);
router
	.route("/:listId/:itemId")
	.delete(listControllers.deleteListItem)
	.patch(listControllers.editListItem);

module.exports = router;
