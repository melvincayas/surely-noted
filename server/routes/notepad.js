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

router.route("/:notepadId/share").post(notepadControllers.shareNotepad);

router
	.route("/:notepadId/:itemId")
	.delete(validateNotepadUser, notepadItemControllers.deleteNotepadItem)
	.patch(validateNotepadUser, notepadItemControllers.editNotepadItem);

router
	.route("/:notepadId/:itemId/status")
	.patch(validateNotepadUser, notepadItemControllers.updateCompletionStatus);

module.exports = router;
