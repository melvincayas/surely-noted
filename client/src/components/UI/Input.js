import React from "react";
import classes from "./styles/Input.module.css";

const Input = props => {
	return (
		<div className={classes.display}>
			<label className={classes.label} for={props.id}>
				{props.label}
			</label>
			<input
				className={classes.input}
				name={props.id}
				type={props.type}
				id={props.id}
			></input>
		</div>
	);
};

export default Input;
