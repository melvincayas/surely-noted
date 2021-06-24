import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Landing = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

	return (
		<Fragment>
			<p>Welcome to SurelyNoted!</p>
			{!isLoggedIn && <Link to="/auth">Log In</Link>}
		</Fragment>
	);
};

export default Landing;
