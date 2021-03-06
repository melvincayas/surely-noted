import React from "react";
import classes from "../../styles/UI/Input.module.css";

const Input = props => {
	return (
		<div className={classes.display}>
			<label className={classes.label} htmlFor={props.id}>
				{props.label}
				{props.inputValid && <i class={`fas fa-check ${classes.feedback}`}></i>}
			</label>
			<input
				onChange={props.onChangeHandler}
				onBlur={props.onBlurHandler}
				className={`${classes.input} ${props.className}`}
				name={props.id}
				type={props.type}
				value={props.value}
				id={props.id}
				placeholder={props.placeholder}
			></input>
		</div>
	);
};

export default Input;
