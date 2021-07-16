import React from "react";
import Card from "./Card";
import classes from "../../styles/UI/Modal.module.css";

const Modal = props => {
	return (
		<div>
			<div onClick={props.clickHandler} className={classes.backdrop}></div>
			<Card header={props.header} className={classes.container}>
				{props.children}
			</Card>
		</div>
	);
};

export default Modal;
