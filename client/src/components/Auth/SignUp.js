import { useReducer, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/user/user-actions";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./Forms.module.css";
import inputStyles from "../UI/styles/Input.module.css";

const defaultUser = {
	name: "",
	nameValid: false,
	nameTouched: false,
	email: "",
	emailValid: false,
	emailTouched: false,
	password: "",
	passwordValid: false,
	passwordTouched: false,
	passwordCheck: "",
	passwordCheckValid: false,
	passwordCheckTouched: false,
};

const userReducer = (state, action) => {
	switch (action.type) {
		case "NAME_INPUT":
			return {
				...state,
				name: action.name,
				nameValid: action.name.trim() !== "",
				nameTouched: false,
			};
		case "EMAIL_INPUT":
			return {
				...state,
				email: action.email,
				emailValid: action.email.includes("@") && action.email.includes("."),
				emailTouched: false,
			};
		case "PASSWORD_INPUT":
			return {
				...state,
				password: action.password,
				passwordValid: action.password.length >= 6,
				passwordTouched: false,
			};

		case "PASSWORDCHECK_INPUT":
			return {
				...state,
				passwordCheck: action.passwordCheck,
				passwordCheckValid: action.passwordCheck === state.password,
				passwordCheckTouched: false,
			};
		case "NAME_BLUR":
			return {
				...state,
				nameTouched: true,
			};
		case "EMAIL_BLUR":
			return {
				...state,
				emailTouched: true,
			};
		case "PASSWORD_BLUR":
			return {
				...state,
				passwordTouched: true,
			};
		case "PASSWORDCHECK_BLUR":
			return {
				...state,
				passwordCheckTouched: true,
			};
		default:
			return defaultUser;
	}
};

const SignUp = props => {
	const [user, dispatchUser] = useReducer(userReducer, defaultUser);
	const [formIsValid, setFormIsValid] = useState(false);
	const dispatch = useDispatch();

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

	const nameBlurHandler = () => {
		dispatchUser({ type: "NAME_BLUR" });
	};

	const emailChangeHandler = event => {
		dispatchUser({ type: "EMAIL_INPUT", email: event.target.value });
	};

	const emailBlurHandler = () => {
		dispatchUser({ type: "EMAIL_BLUR" });
	};

	const passwordChangeHandler = event => {
		dispatchUser({ type: "PASSWORD_INPUT", password: event.target.value });
	};

	const passwordBlurHandler = () => {
		dispatchUser({ type: "PASSWORD_BLUR" });
	};

	const passwordCheckChangeHandler = event => {
		dispatchUser({
			type: "PASSWORDCHECK_INPUT",
			passwordCheck: event.target.value,
		});
	};

	const passwordCheckBlurHandler = () => {
		dispatchUser({ type: "PASSWORDCHECK_BLUR" });
	};

	const formHandler = event => {
		event.preventDefault();
		dispatch(registerNewUser(user.name, user.email, user.password));
	};

	const nameError = !user.nameValid && user.nameTouched;
	const emailError = !user.emailValid && user.emailTouched;
	const passwordError = !user.passwordValid && user.passwordTouched;
	const passwordCheckError =
		!user.passwordCheckValid && user.passwordCheckTouched;

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
					onBlurHandler={nameBlurHandler}
					className={nameError ? inputStyles["input-invalid"] : ""}
					label="Name"
					id="name"
					name="name"
					type="text"
				/>
				<Input
					onChangeHandler={emailChangeHandler}
					inputValid={user.emailValid}
					onBlurHandler={emailBlurHandler}
					className={emailError ? inputStyles["input-invalid"] : ""}
					label="Email"
					id="email"
					name="email"
					type="email"
				/>
				<Input
					onChangeHandler={passwordChangeHandler}
					inputValid={user.passwordValid}
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
					inputValid={user.passwordCheckValid}
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
