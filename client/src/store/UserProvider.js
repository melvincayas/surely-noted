import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

const UserProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			setIsLoggedIn(true);
		}

		return () => {
			setIsLoggedIn(false);
		};
	}, []);

	const isLoggedInHandler = (user, session) => {
		localStorage.setItem("session_id", session);
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
			localStorage.removeItem("session_id");
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
