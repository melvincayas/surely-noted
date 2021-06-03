import React, { useEffect, useReducer } from "react";

export const UserContext = React.createContext();

const defaultUser = {
	userData: null,
	isLoggedIn: false,
	session_id: null,
};

const userReducer = (state, action) => {
	if (action.type === "LOGIN") {
		return {
			userData: action.userData,
			isLoggedIn: true,
			session_id: action.session_id,
		};
	}
	if (action.type === "RELOAD_USER") {
		return {
			...state,
			userData: action.userData,
			session_id: action.session_id,
		};
	}
	if (action.type === "MAINTAIN_LOGIN") {
		return {
			...state,
			isLoggedIn: true,
		};
	}
	if (action.type === "RESET") {
		localStorage.removeItem("session_id");
		return defaultUser;
	}
	return defaultUser;
};

const UserProvider = props => {
	const [userData, dispatchUserData] = useReducer(userReducer, defaultUser);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatchUserData({ type: "MAINTAIN_LOGIN" });
			reloadUser();
		}

		return () => {
			dispatchUserData({ type: "RESET" });
		};
	}, []);

	const reloadUser = async () => {
		const result = await fetch("/user/onload");
		const { response } = await result.json();

		if (response.type === "success") {
			if (localStorage.getItem("session_id") !== response.session_id) {
				return dispatchUserData({ type: "RESET" });
			}
			dispatchUserData({
				type: "RELOAD_USER",
				userData: response.user,
				session_id: response.session_id,
			});
		}
	};

	const isLoggedInHandler = (user, session) => {
		localStorage.setItem("session_id", session);
		dispatchUserData({ type: "LOGIN", userData: user, session_id: session });
	};

	const logOutHandler = async () => {
		const response = await fetch("/user/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}).catch(err => console.log("Error in logout", err));

		const result = await response.json();

		if (result.response.type === "success") {
			dispatchUserData({ type: "RESET" });
		}
	};

	const ctx = {
		isLoggedInHandler,
		logOutHandler,
		userData,
	};

	return (
		<UserContext.Provider value={ctx}>{props.children}</UserContext.Provider>
	);
};

export default UserProvider;
