import { listsActions } from "./lists-slice";
import { fetchData } from "../utilities/helpers";
import { handleAsyncErrors } from "../utilities/helpers";

export const addOneListItem = (listId, input) => {
	return handleAsyncErrors(async dispatch => {
		const request = { content: input };
		const response = await fetchData(`/list/${listId}/add`, "POST", request);
		dispatch(listsActions.getOneList({ list: response.list }));
	});
};

export const removeOneListItem = (listId, itemId) => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData(`/list/${listId}/${itemId}`, "DELETE");
		dispatch(
			listsActions.getOneList({
				list: response.list,
			})
		);
	});
};

export const editOneListItem = (listId, itemId, editContent) => {
	return handleAsyncErrors(async dispatch => {
		const request = { editedContent: editContent };
		const response = await fetchData(
			`/list/${listId}/${itemId}`,
			"PATCH",
			request
		);
		dispatch(listsActions.getOneList({ list: response.list }));
	});
};
