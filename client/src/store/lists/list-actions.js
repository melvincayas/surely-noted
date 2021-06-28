import { listsActions } from "./lists-slice";
import { fetchData } from "../utilities/helpers";
import { handleAsyncErrors } from "../utilities/helpers";

export const getUserLists = () => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/list");
		dispatch(
			listsActions.loadAllLists({
				lists: response.lists,
			})
		);
	});
};

export const createOneList = newList => {
	return handleAsyncErrors(async dispatch => {
		const response = await fetchData("/list", "POST", newList);
		dispatch(listsActions.loadAllLists({ lists: response.lists }));
	});
};

export const deleteOneList = id => {
	return handleAsyncErrors(async dispatch => {
		const request = { id };
		const response = await fetchData("/list", "DELETE", request);
		dispatch(listsActions.loadAllLists({ lists: response.lists }));
	});
};

// export const getOneList = listId => {
// 	return handleAsyncErrors(async dispatch => {
// 		dispatch(listsActions.loading({ status: true }));
// 		const response = await fetchData(`/list/${listId}`);
// 		dispatch(listsActions.viewOneList({ selectedList: response.list }));
// 	});
// };
