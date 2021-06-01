import React from "react";
import classes from "./styles/Input.module.css";

const Input = props => {
	return (
		<div className={classes.display}>
			<label className={classes.label} for={props.id}>
				{props.label}
				{props.inputValid && <i class={`fas fa-check ${classes.feedback}`}></i>}
			</label>
			<input
				onChange={props.onChangeHandler}
				className={classes.input}
				name={props.id}
				type={props.type}
				id={props.id}
				placeholder={props.placeholder}
			></input>
		</div>
	);
};

export default Input;
