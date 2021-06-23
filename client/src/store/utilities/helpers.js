import { errorActions } from "../error/error-slice";
import { userActions } from "../user/user-slice";

class ErrorHandler extends Error {
	constructor(message, origin) {
		super();
		this.message = message;
		this.origin = origin;
	}
}

export const fetchData = async (url, method = "GET", request) => {
	const result = await fetch(url, {
		method: method,
		body: JSON.stringify(request),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const { response } = await result.json();

	if (response.type === "error") {
		throw new ErrorHandler(response.message, response.origin);
	}

	return response;
};

export const handleAsyncErrors = fn => {
	return dispatch => {
		fn(dispatch).catch(err => {
			dispatch(
				errorActions.setError({
					header: err.name,
					message: err.message,
					origin: err.origin,
				})
			);
			dispatch(
				userActions.loading({
					status: false,
				})
			);
		});
	};
};
