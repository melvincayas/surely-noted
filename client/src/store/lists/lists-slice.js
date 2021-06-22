import { createSlice } from "@reduxjs/toolkit";

const initialLists = {
	lists: [],
	selectedList: null,
	listsLoading: null,
};

const listsSlice = createSlice({
	name: "lists",
	initialState: initialLists,
	reducers: {
		loadAllLists(state, action) {
			state.lists = action.payload.lists;
		},
		viewOneList(state, action) {
			state.selectedList = action.payload.selectedList;
			state.listsLoading = null;
		},
		clearAllLists(state) {
			state.lists = [];
		},
		loading(state, action) {
			state.listsLoading = action.payload.status;
		},
	},
});

export const listsActions = listsSlice.actions;
export default listsSlice.reducer;
