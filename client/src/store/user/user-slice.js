import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
	userData: null,
	isLoggedIn: false,
	isLoading: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: {
		login(state, action) {
			localStorage.setItem("session_id", action.payload.session_id);
			state.userData = action.payload.userData;
			state.isLoggedIn = true;
		},
		logout(state) {
			localStorage.removeItem("session_id");
			state.userData = null;
			state.isLoggedIn = false;
		},
		reload(state, action) {
			state.userData = action.payload.userData;
			state.isLoggedIn = true;
		},
		loading(state, action) {
			state.isLoading = action.payload.status;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;