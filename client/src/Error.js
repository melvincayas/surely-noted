import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { errorActions } from "./store/error/error-slice";
import Button from "./components/UI/Button";
import Modal from "./components/UI/Modal";
import classes from "./styles/UI/Modal.module.css";

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
		<Modal errorHandler={errorHandler} header={isError.header}>
			<p className={classes.message}>{isError.message}</p>
			<Button className={classes.button} clickHandler={errorHandler}>
				Close
			</Button>
		</Modal>,
		document.getElementById("modal")
	);

	return <Fragment>{modal}</Fragment>;
};

export default Error;
