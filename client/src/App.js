import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { reloadUser } from "./store/user-slice-actions";
import { userActions } from "./store/user-slice";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import ClientView from "./components/ClientView/ClientView";
import Error from "./Error";
import ListProvider from "./store/ListProvider";

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

	return (
		<Fragment>
			{isError && <Error />}
			<div className="App">
				<Navbar />
				<main>
					{!isLoggedIn && <Auth />}
					<ListProvider>{isLoggedIn && <ClientView />}</ListProvider>
				</main>
			</div>
		</Fragment>
	);
};

export default App;
