import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import { UserContext } from "../../store/UserProvider";

const Navbar = () => {
	const userCtx = useContext(UserContext);

	return (
		<nav className={classes.navbar}>
			<a className={classes.brand} href="#">
				To-Do
			</a>
			<ul className={classes.list}>
				{userCtx.isLoggedIn && (
					<li>
						<a href="#" onClick={userCtx.logOutHandler}>
							Log Out
						</a>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
