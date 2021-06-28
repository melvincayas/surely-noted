import { createSlice } from "@reduxjs/toolkit";

const initialNotepads = {
	notepads: [],
	notepadsLoading: false,
};

const notepadSlice = createSlice({
	name: "notepads",
	initialState: initialNotepads,
	reducers: {
		loadAllNotepads(state, action) {
			state.notepads = action.payload.notepads;
		},
		clearAllNotepads(state) {
			state.notepads = [];
		},
		loading(state, action) {
			state.notepadsLoading = action.payload.status;
		},
	},
});

export const notepadActions = notepadSlice.actions;
export default notepadSlice.reducer;
