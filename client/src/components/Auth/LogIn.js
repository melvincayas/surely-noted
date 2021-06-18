import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { errorActions } from "../../store/error/error-slice";
import { loginUser } from "../../store/user/user-actions";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./Forms.module.css";
import inputStyles from "../../components/UI/styles/Input.module.css";

const defaultUser = {
	email: "",
	emailIsValid: false,
	emailTouched: false,
	password: "",
	passwordIsValid: false,
	passwordTouched: false,
};

const userReducer = (state, action) => {
	switch (action.type) {
		case "EMAIL_INPUT":
			return {
				...state,
				email: action.email,
				emailIsValid: action.email.trim() !== "",
				emailTouched: false,
			};
		case "PASSWORD_INPUT":
			return {
				...state,
				password: action.password,
				passwordIsValid: action.password.trim() !== "",
				passwordTouched: false,
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
		default:
			return defaultUser;
	}
};

const LogIn = props => {
	const [user, dispatchUser] = useReducer(userReducer, defaultUser);
	const dispatch = useDispatch();

	const emailError = !user.emailIsValid && user.emailTouched;
	const passwordError = !user.passwordIsValid && user.passwordTouched;

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

	const formHandler = async event => {
		event.preventDefault();

		if (!user.emailIsValid || !user.passwordIsValid) {
			return dispatch(
				errorActions.setError({
					header: "Error",
					message: "Please enter your credentials.",
				})
			);
		}

		dispatch(loginUser(user.email, user.password));
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
					onBlurHandler={emailBlurHandler}
					className={emailError ? inputStyles["input-invalid"] : ""}
					label="Email"
					id="email"
					name="email"
					type="email"
				/>
				<Input
					onChangeHandler={passwordChangeHandler}
					onBlurHandler={passwordBlurHandler}
					className={passwordError ? inputStyles["input-invalid"] : ""}
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
