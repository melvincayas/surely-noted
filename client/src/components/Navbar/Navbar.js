import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/user-slice-actions";

import classes from "./Navbar.module.css";

const Navbar = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	return (
		<nav className={classes.navbar}>
			<a className={classes.brand} href="#">
				WriteOff
			</a>
			{isLoggedIn && (
				<ul className={classes.list}>
					<li>
						<a href="#" onClick={logoutHandler}>
							Log Out
						</a>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
