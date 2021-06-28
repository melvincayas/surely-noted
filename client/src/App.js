import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reloadUser } from "./store/user/user-actions";
import { getUserLists } from "./store/lists/list-actions";

import Landing from "./components/Landing/Landing";
import Layout from "./components/Wrappers/Layout";
import AuthenticatedRoutes from "./components/Wrappers/AuthenticatedRoutes";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import NotepadDetail from "./components/NotepadDetail/NotepadDetail";

import "./App.css";

const App = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(reloadUser());
		} else {
			history.push("/");
		}
	}, [dispatch, history]);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(getUserLists());
		}
	}, [isLoggedIn, dispatch]);

	return (
		<Layout>
			<Switch>
				<Route path="/" exact component={Landing} />
				{!isLoggedIn && <Route path="/auth" component={Auth} />}
				<AuthenticatedRoutes path="/home" component={Home} />
				<AuthenticatedRoutes path="/list/:listId" component={NotepadDetail} />
				<Route path="*" render={() => <p>Nothing found!</p>} />
			</Switch>
		</Layout>
	);
};

export default App;
