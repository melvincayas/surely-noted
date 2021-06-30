import { useState, useRef, useEffect } from "react";
import classes from "../../styles/NotepadDetail/SettingsDropdownMenu.module.css";

const SettingsDropdownMenu = () => {
	const [settingsActive, setSettingsActive] = useState(false);
	const dropdownRef = useRef();

	useEffect(() => {
		const pageClick = event => {
			if (
				dropdownRef.current !== null &&
				!dropdownRef.current.contains(event.target)
			) {
				setSettingsActive(prevState => !prevState);
			}
		};

		if (settingsActive) {
			document.addEventListener("click", pageClick);
		}

		return () => {
			document.removeEventListener("click", pageClick);
		};
	}, [settingsActive]);

	const settingsHandler = () => setSettingsActive(prevState => !prevState);

	// think about using useReducer here with settingsActive
	const dropdownIconClass = settingsActive
		? classes["dropdown-icon-active"]
		: "";
	const dropdownMenuClass = settingsActive ? classes.active : "";

	return (
		<div ref={dropdownRef} className={classes["dropdown-menu-container"]}>
			<button onClick={settingsHandler}>
				<i className={`fas fa-cog ${dropdownIconClass}`}></i>
			</button>
			<nav className={`${classes["dropdown-menu"]} ${dropdownMenuClass}`}>
				<ul>
					<li>Edit</li>
					<li>Delete</li>
				</ul>
			</nav>
		</div>
	);
};

export default SettingsDropdownMenu;
