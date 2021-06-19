import { useReducer, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/user/user-actions";
import useInputValidation from "../../hooks/useInputValidation";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./Forms.module.css";
import inputStyles from "../UI/styles/Input.module.css";

const SignUp = props => {
	const [formIsValid, setFormIsValid] = useState(false);
	const dispatch = useDispatch();

	const {
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		inputValid: nameIsValid,
		inputError: nameError,
		value: enteredName,
	} = useInputValidation(input => input.trim() !== "");

	const {
		inputChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		inputValid: emailIsValid,
		inputError: emailError,
		value: enteredEmail,
	} = useInputValidation(input => input.includes("@") && input.includes("."));

	const {
		inputChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		inputValid: passwordIsValid,
		inputError: passwordError,
		value: enteredPassword,
	} = useInputValidation(input => input.length >= 6);

	const {
		inputChangeHandler: passwordCheckChangeHandler,
		inputBlurHandler: passwordCheckBlurHandler,
		inputValid: passwordCheckIsValid,
		inputError: passwordCheckError,
	} = useInputValidation(input => input === enteredPassword && passwordIsValid);

	useEffect(() => {
		setFormIsValid(
			nameIsValid && emailIsValid && passwordIsValid && passwordCheckIsValid
		);
	}, [nameIsValid, emailIsValid, passwordIsValid, passwordCheckIsValid]);

	const formHandler = event => {
		event.preventDefault();
		dispatch(registerNewUser(enteredName, enteredEmail, enteredPassword));
	};

	const context = (
		<p className={classes.context}>
			Have an account?{" "}
			<a href="#" onClick={props.formHandler}>
				Log In
			</a>
		</p>
	);

	return (
		<Card className={classes.card} header="Register">
			<form className={classes.form} onSubmit={formHandler} method="POST">
				<Input
					onChangeHandler={nameChangeHandler}
					inputValid={nameIsValid}
					onBlurHandler={nameBlurHandler}
					className={nameError ? inputStyles["input-invalid"] : ""}
					label="Name"
					id="name"
					name="name"
					type="text"
				/>
				<Input
					onChangeHandler={emailChangeHandler}
					inputValid={emailIsValid}
					onBlurHandler={emailBlurHandler}
					className={emailError ? inputStyles["input-invalid"] : ""}
					label="Email"
					id="email"
					name="email"
					type="email"
				/>
				<Input
					onChangeHandler={passwordChangeHandler}
					inputValid={passwordIsValid}
					onBlurHandler={passwordBlurHandler}
					className={passwordError ? inputStyles["input-invalid"] : ""}
					label="Password"
					id="password"
					name="password"
					type="password"
					placeholder={"Must be at least 6 characters"}
				/>
				<Input
					onChangeHandler={passwordCheckChangeHandler}
					inputValid={passwordCheckIsValid}
					onBlurHandler={passwordCheckBlurHandler}
					className={passwordCheckError ? inputStyles["input-invalid"] : ""}
					label="Repeat Password"
					id="passwordCheck"
					name="passwordCheck"
					type="password"
					placeholder={"Must match password"}
				/>
				<div className={classes.container}>
					<Button className={classes.button} isValid={!formIsValid}>
						Register
					</Button>
				</div>
			</form>
			{context}
		</Card>
	);
};

export default SignUp;
