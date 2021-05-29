import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./SignUp.module.css";

const SignUp = () => {
	return (
		<Card className={classes.card} header="Sign Up">
			<form className={classes.form} action="/test" method="POST">
				<Input label="Name" id="name" name="name" type="text" />
				<Input label="Email" id="email" name="email" type="email" />
				<Input label="Password" id="password" name="password" type="password" />
				<Input
					label="Repeat Password"
					id="passwordCheck"
					name="passwordCheck"
					type="password"
				/>
				<div className={classes.container}>
					<Button className={classes.button}>Sign Up</Button>
				</div>
			</form>
		</Card>
	);
};

export default SignUp;
