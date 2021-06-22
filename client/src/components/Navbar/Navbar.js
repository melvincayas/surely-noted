import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/user/user-actions";
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
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link onClick={logoutHandler}>Log Out</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
