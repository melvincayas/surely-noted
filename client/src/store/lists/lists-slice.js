import { createSlice } from "@reduxjs/toolkit";

const initialLists = {
	lists: [],
	selectedListToView: null,
};

const listsSlice = createSlice({
	name: "lists",
	initialState: initialLists,
	reducers: {
		loadAllLists(state, action) {
			state.lists = action.payload.lists;
		},
		viewList(state, action) {
			state.selectedListToView = action.payload.id;
		},
		clearAllLists(state) {
			state.lists = [];
		},
	},
});

export const listsActions = listsSlice.actions;
export default listsSlice.reducer;
