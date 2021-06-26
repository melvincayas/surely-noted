import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/user/user-actions";
import NewList from "../ClientView/NewList/NewList";
import classes from "./Navbar.module.css";

const Navbar = () => {
	const [isMakingList, setIsMakingList] = useState(false);
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	const newListHandler = event => {
		event.preventDefault();
		setIsMakingList(prevIsMakingList => !prevIsMakingList);
	};

	const loggedInLinks = (
		<ul className={classes.list}>
			<li>
				<Link to="/home">Home</Link>
			</li>
			<li>
				<Link to="/" onClick={newListHandler}>
					New List
				</Link>
			</li>
			<li>
				<Link to="/" onClick={logoutHandler}>
					Log Out
				</Link>
			</li>
		</ul>
	);

	return (
		<Fragment>
			{isMakingList && <NewList listToggler={newListHandler} />}
			<nav className={classes.navbar}>
				<Link className={classes.brand} to="/home">
					SurelyNoted
				</Link>
				{isLoggedIn && loggedInLinks}
			</nav>
		</Fragment>
	);
};

export default Navbar;
