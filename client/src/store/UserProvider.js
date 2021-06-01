import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

const UserProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (localStorage.getItem("isLoggedIn") === "1") {
			setIsLoggedIn(true);
		}

		return () => {
			setIsLoggedIn(false);
		};
	}, []);

	const isLoggedInHandler = user => {
		localStorage.setItem("isLoggedIn", 1);
		setIsLoggedIn(true);
		setUserData(user);
	};

	const logOutHandler = async () => {
		const response = await fetch("/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}).catch(err => console.log("Error in logout", err));

		const result = await response.json();

		if (result.response.type === "success") {
			localStorage.removeItem("isLoggedIn");
			setIsLoggedIn(false);
			setUserData(null);
		}
	};

	const ctx = {
		isLoggedIn,
		isLoggedInHandler,
		logOutHandler,
		userData,
	};

	return (
		<UserContext.Provider value={ctx}>{props.children}</UserContext.Provider>
	);
};

export default UserProvider;
