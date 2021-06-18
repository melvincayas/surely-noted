import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
	isError: null,
};

const errorSlice = createSlice({
	name: "error",
	initialState: initialErrorState,
	reducers: {
		setError(state, action) {
			// generic canned message
			if (action.payload.canned) {
				state.isError = {
					header: "Whoops!",
					message: "Something happened on our end. Please try again.",
				};
				return;
			}

			// custom messages
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
