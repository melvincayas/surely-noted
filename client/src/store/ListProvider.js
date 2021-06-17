import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const ListContext = React.createContext();

const ListProvider = props => {
	const [lists, setLists] = useState([]);
	const [selectedList, setSelectedList] = useState(null);

	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

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

	const removeListHandler = id => {
		setLists(prevLists => prevLists.filter(list => list._id !== id));
	};

	const viewListHandler = id => {
		setSelectedList(id);
	};

	let filteredList;
	if (selectedList) {
		[filteredList] = lists.filter(list => list._id === selectedList);
	}

	const ctx = {
		lists,
		newListHandler,
		filteredList,
		removeListHandler,
		viewListHandler,
		setLists,
	};

	return (
		<ListContext.Provider value={ctx}>{props.children}</ListContext.Provider>
	);
};

export default ListProvider;
