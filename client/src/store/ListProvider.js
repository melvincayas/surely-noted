import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";

export const ListContext = React.createContext();

const ListProvider = props => {
	const [lists, setLists] = useState(null);

	const {
		userData: { isLoggedIn },
	} = useContext(UserContext);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			loadLists();
		}
	}, [isLoggedIn]);

	const loadLists = async () => {
		const response = await fetch("/list/onload");
		const result = await response.json();

		if (result.response.type === "success") {
			setLists(result.response.lists);
		}
	};

	const newListHandler = data => {
		setLists(prevLists => [...prevLists, data]);
	};

	const ctx = {
		lists,
		newListHandler,
	};

	return (
		<ListContext.Provider value={ctx}>{props.children}</ListContext.Provider>
	);
};

export default ListProvider;
