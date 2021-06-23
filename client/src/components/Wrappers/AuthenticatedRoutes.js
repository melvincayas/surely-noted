import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthenticatedRoutes = ({ component: Component, ...rest }) => {
	const userIsLoading = useSelector(state => state.user.userIsLoading);
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

	const show = props => {
		if (userIsLoading === "pending" || userIsLoading === "loading") {
			return <LoadingSpinner />;
		} else if (isLoggedIn) {
			return <Component {...props} />;
		} else {
			console.log("coming in here to redirect");
			return <Redirect to="/" />;
		}
	};

	return <Route {...rest} render={show} />;
};

export default AuthenticatedRoutes;
