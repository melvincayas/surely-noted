const express = require("express");
const router = express.Router();
const notepadControllers = require("../controllers/notepad");
const notepadItemControllers = require("../controllers/notepad-item");
const { validateNotepadUser } = require("../public/utilities/middleware");

router
	.route("/")
	.get(notepadControllers.onLoad)
	.post(notepadControllers.newNotepad)
	.delete(notepadControllers.deleteNotepad);

// Items within Notepads
router.post(
	"/:notepadId/add",
	validateNotepadUser,
	notepadItemControllers.newNotepadItem
);

router
	.route("/:notepadId/:itemId")
	.delete(validateNotepadUser, notepadItemControllers.deleteNotepadItem)
	.patch(validateNotepadUser, notepadItemControllers.editNotepadItem);

module.exports = router;
