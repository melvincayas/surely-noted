import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
	isError: null,
	origin: null,
};

const errorSlice = createSlice({
	name: "error",
	initialState: initialErrorState,
	reducers: {
		setError(state, action) {
			state.isError = {
				header: action.payload.header,
				message: action.payload.message,
				origin: action.payload.origin,
			};
		},
		removeError(state) {
			state.isError = null;
			state.origin = null;
		},
	},
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
