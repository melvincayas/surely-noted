import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./error-slice";

const store = configureStore({ reducer: { error: errorReducer } });

export default store;
