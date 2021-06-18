import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { errorActions } from "./store/error/error-slice";
import InfoModal from "./components/UI/InfoModal";

const Error = () => {
	const isError = useSelector(state => state.error.isError);
	const dispatch = useDispatch();

	const errorHandler = () => {
		dispatch(errorActions.removeError());
	};

	const modal = ReactDOM.createPortal(
		<InfoModal
			header={isError.header}
			errorHandler={errorHandler}
			message={isError.message}
		/>,
		document.getElementById("modal")
	);

	return <Fragment>{modal}</Fragment>;
};

export default Error;
