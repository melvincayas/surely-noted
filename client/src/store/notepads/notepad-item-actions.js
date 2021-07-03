import { notepadActions } from "./notepads-slice";
import { fetchData } from "../utilities/helpers";
import { handleAsyncErrors } from "../utilities/helpers";

export const addOneNotepadItem = (notepadId, input) => {
	return handleAsyncErrors(async dispatch => {
		const request = { content: input };
		const response = await fetchData(`/notepad/${notepadId}`, "POST", request);
		dispatch(notepadActions.loadAllNotepads({ notepads: response.notepads }));
	});
};

export const removeOneNotepadItem = (notepadId, itemId) => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData(
			`/notepad/${notepadId}/${itemId}`,
			"DELETE"
		);
		dispatch(
			notepadActions.loadAllNotepads({
				notepads: response.notepads,
			})
		);
	});
};

export const editOneNotepadItem = (notepadId, itemId, editContent) => {
	return handleAsyncErrors(async dispatch => {
		const request = { editedContent: editContent };
		const response = await fetchData(
			`/notepad/${notepadId}/${itemId}`,
			"PATCH",
			request
		);
		dispatch(notepadActions.loadAllNotepads({ notepads: response.notepads }));
	});
};
