import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reloadUser } from "./store/user/user-actions";
import { getUserNotepads } from "./store/notepads/notepad-actions";

import Landing from "./components/Landing/Landing";
import Layout from "./components/Wrappers/Layout";
import AuthenticatedRoutes from "./components/Wrappers/AuthenticatedRoutes";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import NotepadDetail from "./components/NotepadDetail/NotepadDetail";

import "./styles/App.css";

const App = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			return dispatch(reloadUser());
		}

		history.push("/");
	}, [dispatch, history]);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(getUserNotepads());
		}
	}, [isLoggedIn, dispatch]);

	return (
		<Layout>
			<Switch>
				<Route path="/" exact component={Landing} />
				{!isLoggedIn && <Route path="/auth" component={Auth} />}
				<AuthenticatedRoutes path="/home" component={Home} />
				<AuthenticatedRoutes
					path="/notepad/:notepadId"
					component={NotepadDetail}
				/>
				<Route path="*" component={NotFound} />
			</Switch>
		</Layout>
	);
};

export default App;
