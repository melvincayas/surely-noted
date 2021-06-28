import { useDispatch } from "react-redux";
import { errorActions } from "../../store/error/error-slice";
import { loginUser } from "../../store/user/user-actions";
import { useHistory, Link } from "react-router-dom";
import useInputValidation from "../../hooks/useInputValidation";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "../../styles/Auth/Forms.module.css";
import inputStyles from "../../components/UI/styles/Input.module.css";

const LogIn = props => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {
		inputChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		inputValid: emailIsValid,
		inputError: emailError,
		value: enteredEmail,
	} = useInputValidation(input => input.trim() !== "");

	const {
		inputChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		inputValid: passwordIsValid,
		inputError: passwordError,
		value: enteredPassword,
	} = useInputValidation(input => input.trim() !== "");

	const formHandler = async event => {
		event.preventDefault();

		if (!emailIsValid || !passwordIsValid) {
			return dispatch(
				errorActions.setError({
					header: "Error",
					message: "Please enter your credentials.",
				})
			);
		}

		dispatch(loginUser(enteredEmail, enteredPassword));
		history.replace("/home");
	};

	const context = (
		<p className={classes.context}>
			Don't have an account?{" "}
			<Link to="/auth" onClick={props.formHandler}>
				Sign Up
			</Link>
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
