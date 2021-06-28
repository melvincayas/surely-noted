import React from "react";
import Card from "./Card";
import classes from "../../styles/UI/Modal.module.css";

const FormModal = props => {
	return (
		<div onClick={props.clickHandler} className={classes.backdrop}>
			<Card header={props.header} className={classes.container}>
				{props.children}
			</Card>
		</div>
	);
};

export default FormModal;
