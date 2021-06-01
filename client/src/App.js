import React, { useState, useContext } from "react";
import "./App.css";
import Form from "./components/UserInput/Form";
import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import { UserContext } from "./store/UserProvider";

function App() {
	const [list, setList] = useState([]);

	const userCtx = useContext(UserContext);

	const formHandler = todos => {
		setList(prevList => [...prevList, todos]);
	};

	const removeHandler = id => {
		setList(prevList => prevList.filter(todo => todo.id !== id));
	};

	return (
		<div className="App">
			<Navbar />
			<main>
				{!userCtx.isLoggedIn && <Auth />}
				{userCtx.isLoggedIn && <Form liftState={formHandler} />}
				{userCtx.isLoggedIn && <List liftRemove={removeHandler} todos={list} />}
			</main>
		</div>
	);
}

export default App;
