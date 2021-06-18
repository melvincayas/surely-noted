import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./error/error-slice";
import userReducer from "./user/user-slice";
import listsReducer from "./lists/lists-slice";

const store = configureStore({
	reducer: {
		error: errorReducer,
		user: userReducer,
		lists: listsReducer,
	},
});

export default store;
