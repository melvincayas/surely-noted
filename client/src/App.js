import React, { useState, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import ClientView from "./components/ClientView/ClientView";
import { UserContext } from "./store/UserProvider";
import ListProvider from "./store/ListProvider";

function App() {
	const [list, setList] = useState([]);

	const {
		userData: { isLoggedIn },
	} = useContext(UserContext);

	const formHandler = todos => {
		setList(prevList => [...prevList, todos]);
	};

	const removeHandler = id => {
		setList(prevList => prevList.filter(todo => todo._id !== id));
	};

	return (
		<div className="App">
			<Navbar />
			<main>
				{!isLoggedIn && <Auth />}
				<ListProvider>
					{isLoggedIn && (
						<ClientView
							todos={list}
							formHandler={formHandler}
							removeHandler={removeHandler}
						/>
					)}
				</ListProvider>
			</main>
		</div>
	);
}

export default App;
