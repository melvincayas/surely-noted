import { listsActions } from "./lists-slice";
import { errorActions } from "../error/error-slice";
import { fetchData } from "../helpers";

export const addOneListItem = (listId, input) => {
	return async dispatch => {
		try {
			const request = { content: input };
			const response = await fetchData(`/list/${listId}/add`, "POST", request);
			dispatch(listsActions.loadAllLists({ lists: response.lists }));
		} catch (err) {
			dispatch(
				errorActions.setError({ header: err.name, message: err.message })
			);
		}
	};
};

export const removeOneListItem = (listId, itemId) => {
	return async dispatch => {
		try {
			const response = await fetchData(`/list/${listId}/${itemId}`, "DELETE");
			dispatch(
				listsActions.loadAllLists({
					lists: response.lists,
				})
			);
		} catch (err) {
			dispatch(
				errorActions.setError({ header: err.name, message: err.message })
			);
		}
	};
};

export const editOneListItem = (listId, itemId, editContent) => {
	return async dispatch => {
		try {
			const request = { editedContent: editContent };
			const response = await fetchData(
				`/list/${listId}/${itemId}`,
				"PATCH",
				request
			);
			dispatch(listsActions.loadAllLists({ lists: response.lists }));
		} catch (err) {
			dispatch(
				errorActions.setError({ header: err.name, message: err.message })
			);
		}
	};
};
