const express = require("express");
const router = express.Router();
const notepadControllers = require("../controllers/notepad");
const notepadItemControllers = require("../controllers/notepad-item");
const { validateListUser } = require("../public/utilities/middleware");

router
	.route("/")
	.get(notepadControllers.onLoad)
	.post(notepadControllers.newNotepad)
	.delete(notepadControllers.deleteNotepad);

// Items within Lists
router.post(
	"/:notepadId/add",
	validateListUser,
	notepadItemControllers.newNotepadItem
);

router
	.route("/:notepadId/:itemId")
	.delete(validateListUser, notepadItemControllers.deleteNotepadItem)
	.patch(validateListUser, notepadItemControllers.editNotepadItem);

module.exports = router;
