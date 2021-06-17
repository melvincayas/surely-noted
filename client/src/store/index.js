import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./error-slice";
import userReducer from "./user-slice";

const store = configureStore({
	reducer: { error: errorReducer, user: userReducer },
});

export default store;
