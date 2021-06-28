import { listsActions } from "./lists-slice";
import { fetchData } from "../utilities/helpers";
import { handleAsyncErrors } from "../utilities/helpers";

export const getUserNotepads = () => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/list");
		dispatch(
			listsActions.loadAllNotepads({
				lists: response.lists,
			})
		);
	});
};

export const createOneNotepad = newList => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/list", "POST", newList);
		dispatch(listsActions.loadAllNotepads({ lists: response.lists }));
	});
};

export const deleteOneNotepad = id => {
	return handleAsyncErrors(async dispatch => {
		const request = { id };
		const response = await fetchData("/list", "DELETE", request);
		dispatch(listsActions.loadAllNotepads({ lists: response.lists }));
	});
};
