import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { errorActions } from "./store/error/error-slice";
import ErrorModal from "./components/UI/ErrorModal";

const Error = () => {
	const isError = useSelector(state => state.error.isError);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (isError && isError.origin === "authentication") {
			return history.replace("/auth");
		}

		if (isError && isError.origin === "authorization") {
			return history.replace("/home");
		}
	}, [isError, history]);

	const errorHandler = () => {
		dispatch(errorActions.removeError());
	};

	const modal = ReactDOM.createPortal(
		<ErrorModal
			header={isError.header}
			closeHandler={errorHandler}
			message={isError.message}
		/>,
		document.getElementById("modal")
	);

	return <Fragment>{modal}</Fragment>;
};

export default Error;
