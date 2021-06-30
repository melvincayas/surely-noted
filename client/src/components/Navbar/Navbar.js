import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/user/user-actions";
import NewList from "../Home/NewNotepad/NewNotepad";
import classes from "../../styles/Navbar/Navbar.module.css";

const Navbar = () => {
	const [isMakingNotepad, setIsMakingNotepad] = useState(false);
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	const newListHandler = event => {
		event.preventDefault();
		setIsMakingNotepad(prevIsMakingNotepad => !prevIsMakingNotepad);
	};

	const loggedInLinks = (
		<ul className={classes.list}>
			<li>
				<Link to="/home">Home</Link>
			</li>
			<li>
				<Link to="/" onClick={newListHandler}>
					New Notepad
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
			{isMakingNotepad && <NewList listToggler={newListHandler} />}
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
