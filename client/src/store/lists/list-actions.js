import { listsActions } from "./lists-slice";
import { fetchData } from "../helpers";
import { handleAsyncErrors } from "../helpers";

export const getUserLists = () => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/list/onload");
		dispatch(
			listsActions.loadAllLists({
				lists: response.lists,
			})
		);
	});
};

export const createOneList = newList => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/list/new", "POST", newList);
		dispatch(listsActions.loadAllLists({ lists: response.lists }));
	});
};

export const deleteOneList = id => {
	return handleAsyncErrors(async dispatch => {
		const request = { id };
		const response = await fetchData("/list/delete", "DELETE", request);
		dispatch(listsActions.loadAllLists({ lists: response.lists }));
	});
};
