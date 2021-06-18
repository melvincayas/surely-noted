import { userActions } from "./user-slice";
import { errorActions } from "../error/error-slice";
import { fetchData } from "../helpers";

export const registerNewUser = (name, email, password) => {
	return async dispatch => {
		try {
			const request = { name, email, password };

			const response = await fetchData("/user/register", "POST", request);

			dispatch(
				userActions.login({
					userData: response.user,
					session_id: response.session_id,
				})
			);
		} catch (err) {
			dispatch(
				errorActions.setError({ header: "Error", message: err.message })
			);
		}
	};
};

export const loginUser = (email, password) => {
	return async dispatch => {
		try {
			const request = { email, password };

			const response = await fetchData("/user/login", "POST", request);

			dispatch(
				userActions.login({
					userData: response.user,
					session_id: response.session_id,
				})
			);
		} catch (err) {
			dispatch(
				errorActions.setError({ header: "Error", message: err.message })
			);
		}
	};
};

export const logoutUser = () => {
	return async dispatch => {
		try {
			await fetchData("/user/logout", "POST");
			dispatch(userActions.logout());
		} catch (err) {
			dispatch(
				errorActions.setError({ header: "Error", message: err.message })
			);
		}
	};
};

export const reloadUser = () => {
	return async dispatch => {
		try {
			const response = await fetchData("/user/onload");

			if (localStorage.getItem("session_id") !== response.session_id) {
				return dispatch(userActions.logout());
			}

			dispatch(
				userActions.reload({
					userData: response.user,
				})
			);
		} catch (err) {
			dispatch(
				errorActions.setError({ header: "Error", message: err.message })
			);
		}
	};
};
