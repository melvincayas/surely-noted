import React, { useReducer, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { errorActions } from "../../store/error-slice";
import { UserContext } from "../../store/UserProvider";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./Forms.module.css";

const defaultUser = {
	name: "",
	nameValid: false,
	email: "",
	emailValid: false,
	password: "",
	passwordValid: false,
	passwordCheck: "",
	passwordCheckValid: false,
};

const userReducer = (state, action) => {
	if (action.type === "NAME_INPUT") {
		return {
			...state,
			name: action.name,
			nameValid: action.name.length > 0 && action.name.trim() !== "",
		};
	}
	if (action.type === "EMAIL_INPUT") {
		return {
			...state,
			email: action.email,
			emailValid: action.email.includes("@"),
		};
	}
	if (action.type === "PASSWORD_INPUT") {
		return {
			...state,
			password: action.password,
			passwordValid: action.password.length >= 6,
		};
	}
	if (action.type === "PASSWORDCHECK_INPUT") {
		return {
			...state,
			passwordCheck: action.passwordCheck,
			passwordCheckValid: action.passwordCheck === state.password,
		};
	}
};

const SignUp = props => {
	const [user, dispatchUser] = useReducer(userReducer, defaultUser);
	const [formIsValid, setFormIsValid] = useState(false);

	const dispatch = useDispatch();

	const { isLoggedInHandler } = useContext(UserContext);

	useEffect(() => {
		setFormIsValid(
			user.nameValid &&
				user.emailValid &&
				user.passwordValid & user.passwordCheckValid
		);
	}, [
		user.nameValid,
		user.emailValid,
		user.passwordValid,
		user.passwordCheckValid,
	]);

	const nameChangeHandler = event => {
		dispatchUser({ type: "NAME_INPUT", name: event.target.value });
	};

	const emailChangeHandler = event => {
		dispatchUser({ type: "EMAIL_INPUT", email: event.target.value });
	};

	const passwordChangeHandler = event => {
		dispatchUser({ type: "PASSWORD_INPUT", password: event.target.value });
	};

	const passwordCheckChangeHandler = event => {
		dispatchUser({
			type: "PASSWORDCHECK_INPUT",
			passwordCheck: event.target.value,
		});
	};

	const formHandler = async event => {
		event.preventDefault();

		const person = {
			name: user.name,
			email: user.email,
			password: user.password,
		};

		const result = await fetch("/user/register", {
			method: "POST",
			body: JSON.stringify(person),
			headers: {
				"Content-Type": "application/json",
			},
		}).catch(err => console.log("Error in Register fetch", err));

		const { response } = await result.json();

		if (response.type === "success") {
			isLoggedInHandler(response.user, response.session_id);
		} else {
			dispatch(
				errorActions.setError({
					header: "Error Signing Up",
					message: response.message,
				})
			);
		}
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
					inputValid={user.nameValid}
					label="Name"
					id="name"
					name="name"
					type="text"
				/>
				<Input
					onChangeHandler={emailChangeHandler}
					inputValid={user.emailValid}
					label="Email"
					id="email"
					name="email"
					type="email"
				/>
				<Input
					onChangeHandler={passwordChangeHandler}
					inputValid={user.passwordValid}
					label="Password"
					id="password"
					name="password"
					type="password"
					placeholder={"Must be at least 6 characters"}
				/>
				<Input
					onChangeHandler={passwordCheckChangeHandler}
					inputValid={user.passwordCheckValid}
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
