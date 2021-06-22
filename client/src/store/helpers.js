import { errorActions } from "./error/error-slice";

export const handleAsyncErrors = fn => {
	return dispatch => {
		fn(dispatch).catch(err => {
			dispatch(
				errorActions.setError({ header: err.name, message: err.message })
			);
		});
	};
};

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
		throw new Error(response.message);
	}

	return response;
};