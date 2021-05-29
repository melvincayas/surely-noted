import React from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<a className={classes.brand} href="#">
				To-Do
			</a>
			<ul className={classes.list}>
				<li>
					<a href="#">Home</a>
				</li>
				<li>
					<a href="#">Sign Up</a>
				</li>
				<li>
					<a href="#">Log In</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
