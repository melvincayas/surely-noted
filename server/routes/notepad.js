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

router
	.route("/:notepadId")
	.put(notepadControllers.editNotepad)
	.post(validateNotepadUser, notepadItemControllers.newNotepadItem);

router
	.route("/:notepadId/:itemId")
	.post(validateNotepadUser, notepadItemControllers.updateCompletionStatus)
	.delete(validateNotepadUser, notepadItemControllers.deleteNotepadItem)
	.patch(validateNotepadUser, notepadItemControllers.editNotepadItem);

module.exports = router;
