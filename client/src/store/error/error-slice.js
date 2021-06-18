import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
	isError: null,
};

const errorSlice = createSlice({
	name: "error",
	initialState: initialErrorState,
	reducers: {
		setError(state, action) {
			state.isError = {
				header: action.payload.header,
				message: action.payload.message,
			};
		},
		removeError(state) {
			state.isError = null;
		},
	},
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
