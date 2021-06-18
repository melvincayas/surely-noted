import { listsActions } from "./lists-slice";
import { errorActions } from "../error/error-slice";
import { fetchData } from "../helpers";

export const getUserLists = () => {
	return async dispatch => {
		try {
			const response = await fetchData("/list/onload");
			dispatch(
				listsActions.loadAllLists({
					lists: response.lists,
				})
			);
		} catch (err) {
			dispatch(
				errorActions.setError({ header: "Error", message: err.message })
			);
		}
	};
};

export const createOneList = newList => {
	return async dispatch => {
		try {
			const response = await fetchData("/list/new", "POST", newList);
			dispatch(listsActions.loadAllLists({ lists: response.lists }));
		} catch (err) {
			dispatch(
				errorActions.setError({ header: "Error", message: err.message })
			);
		}
	};
};

export const deleteOneList = id => {
	return async dispatch => {
		try {
			const request = { id };

			const response = await fetchData("/list/delete", "DELETE", request);

			dispatch(listsActions.loadAllLists({ lists: response.lists }));
		} catch (err) {
			dispatch(
				errorActions.setError({ header: "Error", message: err.message })
			);
		}
	};
};
