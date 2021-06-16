import { Fragment, useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const Auth = () => {
	const [registered, setIsRegistered] = useState(true);

	const formHandler = () => {
		setIsRegistered(prevState => !prevState);
	};

	return (
		<Fragment>
			{registered && <LogIn formHandler={formHandler} />}
			{!registered && <SignUp formHandler={formHandler} />}
		</Fragment>
	);
};

export default Auth;
