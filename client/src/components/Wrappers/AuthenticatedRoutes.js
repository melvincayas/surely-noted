import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthenticatedRoutes = ({ component: Component, ...rest }) => {
	const isLoading = useSelector(state => state.user.isLoading);
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

	const show = props => {
		if (isLoading) {
			return <LoadingSpinner />;
		} else if (isLoggedIn) {
			return <Component {...props} />;
		} else {
			return <Redirect to="/" />;
		}
	};

	return <Route {...rest} render={show} />;
};

export default AuthenticatedRoutes;
