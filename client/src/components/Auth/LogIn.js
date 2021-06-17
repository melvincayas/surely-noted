import { useReducer } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./Forms.module.css";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { errorActions } from "../../store/error-slice";

const defaultUser = {
	email: "",
	password: "",
};

const userReducer = (state, action) => {
	if (action.type === "EMAIL_INPUT") {
		return {
			...state,
			email: action.email,
		};
	}
	if (action.type === "PASSWORD_INPUT") {
		return {
			...state,
			password: action.password,
		};
	}

	return defaultUser;
};

const LogIn = props => {
	const [user, dispatchUser] = useReducer(userReducer, defaultUser);

	const dispatch = useDispatch();

	const emailChangeHandler = event => {
		dispatchUser({ type: "EMAIL_INPUT", email: event.target.value });
	};

	const passwordChangeHandler = event => {
		dispatchUser({ type: "PASSWORD_INPUT", password: event.target.value });
	};

	const formHandler = async event => {
		event.preventDefault();

		const request = {
			email: user.email,
			password: user.password,
		};

		const result = await fetch("/user/login", {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
		}).catch(err => console.log("Error in Register fetch", err));

		const { response } = await result.json();

		if (response.type === "success") {
			dispatch(
				userActions.login({
					userData: response.user,
					session_id: response.session_id,
				})
			);
		} else {
			dispatch(
				errorActions.setError({
					header: "Error Logging In",
					message: response.message,
				})
			);
		}
	};

	const context = (
		<p className={classes.context}>
			Don't have an account?{" "}
			<a href="#" onClick={props.formHandler}>
				Sign Up
			</a>
		</p>
	);

	return (
		<Card className={classes.card} header="Log In">
			<form className={classes.form} onSubmit={formHandler} method="POST">
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
				/>
				<div className={classes.container}>
					<Button className={classes.button}>Log In</Button>
				</div>
			</form>
			{context}
		</Card>
	);
};

export default LogIn;
