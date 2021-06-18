import { listsActions } from "./lists-slice";
import { errorActions } from "../error/error-slice";

export const getUserLists = () => {
	return async dispatch => {
		try {
			const result = await fetch("/list/onload");
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
					header: "Error",
					message: response.message,
				})
			);
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};

export const createOneList = newList => {
	return async dispatch => {
		try {
			const result = await fetch("/list/new", {
				method: "POST",
				body: JSON.stringify(newList),
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
					header: "Error with List",
					message: response.message,
				})
			);
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};

export const deleteOneList = id => {
	return async dispatch => {
		try {
			const request = { id };

			const result = await fetch("/list/delete", {
				method: "DELETE",
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
					header: "Error",
					message: response.message,
				})
			);
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};
