import React, { useState, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import ClientView from "./components/ClientView/ClientView";
import { UserContext } from "./store/UserProvider";
import ListProvider from "./store/ListProvider";

function App() {
	const {
		userData: { isLoggedIn },
	} = useContext(UserContext);

	return (
		<div className="App">
			<Navbar />
			<main>
				{!isLoggedIn && <Auth />}
				<ListProvider>{isLoggedIn && <ClientView />}</ListProvider>
			</main>
		</div>
	);
}

export default App;