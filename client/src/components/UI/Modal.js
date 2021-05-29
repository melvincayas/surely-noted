import React from "react";
import Card from "./Card";
import Button from "./Button";
import classes from "./styles/Modal.module.css";

const Modal = props => {
	return (
		<div onClick={props.errorHandler} className={classes.backdrop}>
			<Card header={props.header} className={classes.container}>
				<p className={classes.message}>{props.message}</p>
				<Button className={classes.button} clickHandler={props.errorHandler}>
					Close
				</Button>
			</Card>
		</div>
	);
};

export default Modal;
