import { userActions } from "./user-slice";
import { errorActions } from "../error/error-slice";

export const logoutUser = () => {
	return async dispatch => {
		try {
			const result = await fetch("/user/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}).catch(err => console.log("Error in logout", err));

			const { response } = await result.json();

			if (response.type === "success") {
				dispatch(userActions.logout());
			}
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};

export const reloadUser = () => {
	return async dispatch => {
		try {
			const result = await fetch("/user/onload");
			const { response } = await result.json();

			if (response.type === "success") {
				if (localStorage.getItem("session_id") !== response.session_id) {
					return dispatch(userActions.logout());
				}
				dispatch(
					userActions.reload({
						userData: response.user,
					})
				);
			}
		} catch (err) {
			dispatch(errorActions.setError({ canned: true }));
		}
	};
};
