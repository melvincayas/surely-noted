import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
	userData: null,
	isLoggedIn: false,
	userIsLoading: "pending",
};

const userSlice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: {
		login(state, action) {
			localStorage.setItem("session_id", action.payload.session_id);
			state.userData = action.payload.userData;
			state.isLoggedIn = true;
			state.userIsLoading = "complete";
		},
		logout(state) {
			localStorage.removeItem("session_id");
			state.userData = null;
			state.isLoggedIn = false;
		},
		reload(state, action) {
			state.userData = action.payload.userData;
			state.isLoggedIn = true;
			state.userIsLoading = "complete";
		},
		loading(state, action) {
			state.userIsLoading = action.payload.status;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
