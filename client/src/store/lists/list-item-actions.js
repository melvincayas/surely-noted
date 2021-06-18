import { listsActions } from "./lists-slice";
import { errorActions } from "../error/error-slice";

export const addOneListItem = (listId, input) => {
	return async dispatch => {
		try {
			const request = { content: input };

			const result = await fetch(`/list/${listId}/add`, {
				method: "POST",
				body: JSON.stringify(request),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { response } = await result.json();

			if (response.type === "success") {
				return dispatch(listsActions.loadAllLists({ lists: response.lists }));
			}

			dispatch(
				errorActions.setError({
					header: "Error Adding",
					message: response.message,
				})
			);
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};

export const removeOneListItem = (listId, itemId) => {
	return async dispatch => {
		try {
			const result = await fetch(`/list/${listId}/${itemId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { response } = await result.json();

			if (response.type === "success") {
				return dispatch(
					listsActions.loadAllLists({
						lists: response.lists,
					})
				);
			}

			dispatch(
				errorActions.setError({
					header: "Error Deleting",
					message: response.message,
				})
			);
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};

export const editOneListItem = (listId, itemId, editContent) => {
	return async dispatch => {
		try {
			const request = { editedContent: editContent };

			const result = await fetch(`/list/${listId}/${itemId}`, {
				method: "PATCH",
				body: JSON.stringify(request),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { response } = await result.json();

			if (response.type === "success") {
				return dispatch(listsActions.loadAllLists({ lists: response.lists }));
			}

			dispatch(
				errorActions.setError({
					header: "Error Editing",
					message: response.message,
				})
			);
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};
