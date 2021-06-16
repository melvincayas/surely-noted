import { useContext } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import ClientView from "./components/ClientView/ClientView";
import { UserContext } from "./store/UserProvider";
import ListProvider from "./store/ListProvider";
import Error from "./Error";

import "./App.css";

const App = () => {
	const isError = useSelector(state => state.error.isError);

	const {
		userData: { isLoggedIn },
	} = useContext(UserContext);

	return (
		<div className="App">
			{isError && <Error />}
			<Navbar />
			<main>
				{!isLoggedIn && <Auth />}
				<ListProvider>{isLoggedIn && <ClientView />}</ListProvider>
			</main>
		</div>
	);
};

export default App;
