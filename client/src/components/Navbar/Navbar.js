import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import { UserContext } from "../../store/UserProvider";

const Navbar = () => {
	const userCtx = useContext(UserContext);
	const {
		userData: { isLoggedIn },
	} = userCtx;
	const { logOutHandler } = userCtx;

	return (
		<nav className={classes.navbar}>
			<a className={classes.brand} href="#">
				WriteOff
			</a>
			{isLoggedIn && (
				<ul className={classes.list}>
					<li>
						<a href="#" onClick={logOutHandler}>
							Log Out
						</a>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
