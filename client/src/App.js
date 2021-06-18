import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "./store/user/user-slice";
import { listsActions } from "./store/lists/lists-slice";
import { reloadUser } from "./store/user/user-actions";
import { getUserLists } from "./store/lists/list-actions";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import ClientView from "./components/ClientView/ClientView";
import Error from "./Error";

import "./App.css";

const App = () => {
	const isError = useSelector(state => state.error.isError);
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(reloadUser());
		}

		return () => {
			dispatch(userActions.logout());
		};
	}, [dispatch]);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(getUserLists());
		}

		return () => {
			dispatch(listsActions.clearAllLists());
		};
	}, [isLoggedIn, dispatch]);

	return (
		<Fragment>
			{isError && <Error />}
			<div className="App">
				<Navbar />
				<main>
					{!isLoggedIn && <Auth />}
					{isLoggedIn && <ClientView />}
				</main>
			</div>
		</Fragment>
	);
};

export default App;
