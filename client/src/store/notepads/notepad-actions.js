import { notepadActions } from "./notepads-slice";
import { fetchData } from "../utilities/helpers";
import { handleAsyncErrors } from "../utilities/helpers";

export const getUserNotepads = () => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/notepad");
		dispatch(
			notepadActions.loadAllNotepads({
				notepads: response.notepads,
			})
		);
	});
};

export const createOneNotepad = newList => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/notepad", "POST", newList);
		dispatch(notepadActions.loadAllNotepads({ notepads: response.notepads }));
	});
};

export const deleteOneNotepad = id => {
	return handleAsyncErrors(async dispatch => {
		const request = { id };
		const response = await fetchData("/notepad", "DELETE", request);
		dispatch(notepadActions.loadAllNotepads({ notepads: response.notepads }));
	});
};

export const editOneNotepad = (editedNotepad, id) => {
	return handleAsyncErrors(async dispatch => {
		const request = editedNotepad;
		const response = await fetchData(`/notepad/${id}`, "PUT", request);
		dispatch(notepadActions.loadAllNotepads({ notepads: response.notepads }));
	});
};
