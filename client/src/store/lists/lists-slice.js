import { createSlice } from "@reduxjs/toolkit";

const initialLists = {
	lists: [],
	listsLoading: false,
};

const listsSlice = createSlice({
	name: "lists",
	initialState: initialLists,
	reducers: {
		loadAllNotepads(state, action) {
			state.lists = action.payload.lists;
		},
		clearAllNotepads(state) {
			state.lists = [];
		},
		loading(state, action) {
			state.listsLoading = action.payload.status;
		},
	},
});

export const listsActions = listsSlice.actions;
export default listsSlice.reducer;
