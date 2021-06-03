import React, { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const Auth = () => {
	const [registered, setIsRegistered] = useState(true);

	const formHandler = () => {
		setIsRegistered(prevState => !prevState);
	};

	return (
		<React.Fragment>
			{registered && <LogIn formHandler={formHandler} />}
			{!registered && <SignUp formHandler={formHandler} />}
		</React.Fragment>
	);
};

export default Auth;
