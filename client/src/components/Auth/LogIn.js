import React, { useReducer, useState, useContext } from "react";
import { UserContext } from "../../store/UserProvider";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import classes from "./SignUp.module.css";

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

const SignUp = () => {
	const [user, dispatchUser] = useReducer(userReducer, defaultUser);
	const [isError, setIsError] = useState(null);

	const userCtx = useContext(UserContext);

	const emailChangeHandler = event => {
		dispatchUser({ type: "EMAIL_INPUT", email: event.target.value });
	};

	const passwordChangeHandler = event => {
		dispatchUser({ type: "PASSWORD_INPUT", password: event.target.value });
	};

	const errorHandler = () => {
		setIsError(null);
	};

	const formHandler = async event => {
		event.preventDefault();

		const request = {
			email: user.email,
			password: user.password,
		};

		const response = await fetch("/login", {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
		}).catch(err => console.log("Error in Register fetch", err));

		const result = await response.json();

		if (result.response.type === "success") {
			userCtx.isLoggedInHandler(result.response.user);
		} else {
			setIsError({
				message: result.response.message,
			});
		}
	};

	return (
		<React.Fragment>
			{isError &&
				ReactDOM.createPortal(
					<Modal
						header={"Error"}
						errorHandler={errorHandler}
						message={isError.message}
					/>,
					document.getElementById("modal")
				)}
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
			</Card>
		</React.Fragment>
	);
};

export default SignUp;
