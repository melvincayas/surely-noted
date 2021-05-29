import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/UserInput/Form";
import List from "./components/List/List";
import SignUp from "./components/Auth/SignUp";
import Navbar from "./components/Navbar/Navbar";

function App() {
	const [list, setList] = useState([]);

	const formHandler = todos => {
		setList(prevList => [...prevList, todos]);
	};

	const removeHandler = id => {
		setList(prevList => prevList.filter(todo => todo.id !== id));
	};

	return (
		<div className="App">
			<Navbar />
			<SignUp />
			<Form liftState={formHandler} />
			<List liftRemove={removeHandler} todos={list} />
		</div>
	);
}

export default App;
