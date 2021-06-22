import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "./store/user/user-slice";
import { listsActions } from "./store/lists/lists-slice";
import { reloadUser } from "./store/user/user-actions";
import { getUserLists } from "./store/lists/list-actions";

import Layout from "./components/Wrappers/Layout";
import AuthenticatedRoutes from "./components/Wrappers/AuthenticatedRoutes";
import Auth from "./components/Auth/Auth";
import ClientView from "./components/ClientView/ClientView";
import ListDetail from "./components/ClientView/ListDetail/ListDetail";

import "./App.css";

const App = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(reloadUser());
			history.push("/home");
		} else {
			history.push("/");
		}

		return () => {
			dispatch(userActions.logout());
		};
	}, [dispatch, history]);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(getUserLists());
		}

		return () => {
			dispatch(listsActions.clearAllLists());
		};
	}, [isLoggedIn, dispatch]);

	return (
		<Layout>
			<Switch>
				<Route path="/" component={Auth} exact />
				<AuthenticatedRoutes path="/home" component={ClientView} />
				<AuthenticatedRoutes path="/list/:listId" component={ListDetail} />
				<Route path="*" render={() => <p>Nothing found!</p>} />
			</Switch>
		</Layout>
	);
};

export default App;
