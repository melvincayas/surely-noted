import { userActions } from "./user-slice";
import { fetchData } from "../utilities/helpers";
import { handleAsyncErrors } from "../utilities/helpers";

export const registerNewUser = (name, email, password) => {
	return handleAsyncErrors(async dispatch => {
		const request = { name, email, password };
		const response = await fetchData("/user/register", "POST", request);
		dispatch(
			userActions.login({
				userData: response.user,
				session_id: response.session_id,
			})
		);
	});
};

export const loginUser = (email, password) => {
	return handleAsyncErrors(async dispatch => {
		dispatch(userActions.loading({ status: "loading" }));
		const request = { email, password };
		const response = await fetchData("/user/login", "POST", request);
		dispatch(
			userActions.login({
				userData: response.user,
				session_id: response.session_id,
			})
		);
	});
};

export const logoutUser = () => {
	return handleAsyncErrors(async dispatch => {
		await fetchData("/user/logout", "POST");
		dispatch(userActions.logout());
	});
};

export const reloadUser = () => {
	return handleAsyncErrors(async dispatch => {
		dispatch(userActions.loading({ status: "loading" }));
		const response = await fetchData("/user/onload");

		if (localStorage.getItem("session_id") !== response.session_id) {
			return dispatch(userActions.logout());
		}

		dispatch(
			userActions.reload({
				userData: response.user,
			})
		);
	});
};
